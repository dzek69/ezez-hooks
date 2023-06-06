/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { isPlainObject, mapValues } from "@ezez/utils";

interface ConditionalHook<T extends (...args: any[]) => any> {
    hook: T;
    changeDetector?: undefined | ((returnValue: ReturnType<T>) => any[]);
}

const createConditionalHook = <T extends (...args: any[]) => any>(
    hook: T | null,
    changeDetector?: (value: ReturnType<T>) => any[],
): ConditionalHook<T> | null => {
    if (!hook) {
        return null;
    }
    return {
        hook, changeDetector,
    };
};

const HookHandler: React.FC<{
    hook: () => unknown;

    changeDetector?: undefined | ((returnValue: any) => unknown[]);
    onChange: (key: string, newValue: unknown) => void;
    fnKey: string;
}> = (props) => {
    const res = props.hook();

    const deps = props.changeDetector
        ? props.changeDetector(res)
        : Array.isArray(res)
            ? res
            : (
                isPlainObject(res)
                    ? Object.values(res as Record<string, unknown>)
                    : [res]
            );

    useEffect(() => {
        props.onChange(props.fnKey, res);
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

const useConditionalHooks = <
    RT extends (...args: any[]) => any,
    LI extends { [key: string]: ConditionalHook<RT> | null | undefined },
>(fns: LI): [
    {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        [K in keyof LI]: LI[K] extends ConditionalHook<infer RT> | null | undefined ? (ReturnType<RT> | null) : never;
    },
    React.ReactNode,
] => {
    const [_, set_] = useState(0);
    const data = useRef<Map<string, unknown>>(new Map());

    const handleChange = useCallback((k: string, v: unknown) => {
        data.current.set(k, v);
        set_((x) => x + 1);
    }, []);

    // clear cache data for removed hooks
    for (const [key] of data.current) {
        if (!fns.hasOwnProperty(key)) {
            data.current.delete(key);
        }
    }

    const hooks = Object.entries(fns).filter(([key, fn]) => Boolean(fn)) as [string, ConditionalHook<RT>][];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
        mapValues(fns, (fn, key) => (fn ? data.current.get(String(key)) : null)) as any,
        <Fragment key={"."}>
            {hooks.map(([key, fn]) => (
                <HookHandler
                    key={key}
                    hook={fn.hook}
                    fnKey={key}
                    changeDetector={fn.changeDetector}
                    onChange={handleChange}
                />
            ))}
        </Fragment>,
    ];
};

export {
    useConditionalHooks,
    createConditionalHook,
};


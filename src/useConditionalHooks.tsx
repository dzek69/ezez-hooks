import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { isPlainObject } from "@ezez/utils";

interface ConditionalHook<RT = unknown> {
    key: string;
    hook: () => RT;
}

const HookHandler: React.FC<{
    hook: () => unknown;
    onChange: (key: string, newValue: unknown) => void;
    fnKey: string;
}> = (props) => {
    const res = props.hook();

    const deps = Array.isArray(res)
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

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const useConditionalHooks = <CH extends ConditionalHook<RT>, RT>(fns: readonly CH[]): [
    ReturnType<CH["hook"]>[],
    React.ReactNode,
] => {
    const [_, set_] = useState(0);
    const data = useRef<Map<string, unknown>>(new Map());

    const handleChange = useCallback((k: string, v: unknown) => {
        data.current.set(k, v);
        set_((x) => x + 1);
    }, []);

    for (const [key] of data.current) {
        if (!fns.some((fn) => fn.key === key)) {
            data.current.delete(key);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
        fns.map((fn) => {
            return data.current.get(fn.key);
        }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        <Fragment key={"."}>
            {fns.map((fn) => (
                <HookHandler
                    key={fn.key}
                    hook={fn.hook}
                    fnKey={fn.key}
                    onChange={handleChange}
                />
            ))}
        </Fragment>,
    ];
};

export {
    useConditionalHooks,
};


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from "react";

import { isPlainObject, mapValues } from "@ezez/utils";

import { useEffect2 } from "./useEffect2.js";

/**
 * Interface representing a conditional hook that can be passed to `useConditionalHooks`.
 *
 * @param T - a function that will run the hook when called.
 */
interface ConditionalHook<T extends (...args: any[]) => any> {
    /**
     * A function that will run the hook when called.
     */
    hook: T;
    /**
     * A function that manually defines dependencies for the hook. If not provided, dependencies will be automatically
     * detected.
     */
    changeDetector?: undefined | ((returnValue: ReturnType<T>) => any[]);
}

/**
 * Helper for passing a hook to `useConditionalHooks`. Make sure to understand how `useConditionalHooks` works before
 * using this.
 *
 * @example
 * ```ts
 * useConditionalHooks({
 *    optionalHookAutoMode: createConditionalHook(() => useState(0))
 *    optionalHook: createConditionalHook(() => useState(0), (value) => [value[0]])
 * });
 * ```
 *
 * @param hook - hook you want to pass
 * @param changeDetector - optional function that returns dependencies for the hook
 * @returns - object that can be passed to `useConditionalHooks`
 */
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
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
                    ? Object.values(res as Record<string, unknown>)
                    : [res]
            );

    useEffect2(() => {
        props.onChange(props.fnKey, res);
    }, deps);

    return null;
};

/**
 * Allows you to run hooks conditionally.
 *
 * How to use it:
 * - It expects an object
 * - In this object keys are a hook identity, just like when rendering arrays
 * - Values in this object defines:
 *   - hook to run
 *   - optionally a custom logic to detect changes in the hook returned values
 *
 * @example
 * ```ts
 * const [data, render] = useConditionalHooks({
 *    state: { hook: () => useState(0) },
 * });
 * ```
 *
 * This is most basic example. Notice the param object with `state` key - value of `state` is an object that defines a
 * function that runs the hook - do not call the hook here.
 *
 * `state` is just an example name. Use whatever suits you. Keys defines hooks identity. By this identity hook return
 * values will be retained as long as next call includes the same key.
 *
 * In return you get a tuple with two elements:
 * - `data`, which is an object with the same keys as the param object, but values are the hook return values
 * - `render`, which is a React node that you need to render in your component. Remember to always render it! If you are
 * using loading spinner for example make sure to do `<>{render}<Loading /></>` or similar.
 *
 * One important thing to remember is that `data.state` (or any other hook you define) will be `undefined` on initial
 * render. This is sacrifice we need to make to allow conditional hooks.
 *
 * Now let's talk about the second value you can pass with the hook - the change detector. Let's start with explaining
 * what's happening under the hood. When you call `useConditionalHooks` it will prepare you a set of components that you
 * need to render. Only after they are rendered - your hooks are actually called (that's why on first render you will
 * get `undefined` in the `data[key]`). After the hooks are called we need to detect if something is changed and if it
 * is the case - we change the internal state, which will trigger a re-render of your component. Re-rendering your
 * component means it will render the set of components again, which will call your hooks again.
 *
 * This in theory sounds like an infinite loop, but if we detect of hook values are changed we can avoid it. You should
 * be aware that `[] === []` is always false, because they are two different arrays, even when they contain the same
 * values.
 *
 * By default, `useConditionalHooks` will act smart and if your hooks return an array it will compare the values inside
 * the array, not the array itself. If object is returned it will compare the values of the object. If primitive value
 * is returned it will compare the value itself.
 *
 * In rare cases this might not work perfectly every time. Let's take this hook as an example:
 * ```ts
 * // Returns timestamp of today and some data about it
 * const useCurrentDate = () => {
 *     const date = new Date();
 *     const startOfDayAsTimestamp = // ... some implementation
 *     return [startOfDayAsTimestamp, { dayOfWeek: date.getDay() , dayOfMonth: date.getDate() }];
 * };
 * ```
 *
 * Each time you call this hook you will get a new array, but it will include a new object as second value. Here is
 * where `useConditionalHooks` will get into infinite loop. To fix this you can pass a custom change detector. Change
 * detector is a function that takes the hook return value and should return an array of dependencies, similar to
 * dependencies of `useEffect` hook.
 *
 * An example of such change detector for `useCurrentDate` hook could be:
 * ```ts
 * (returnValue) => {
 *     return [returnValue[0], returnValue[1].dayOfWeek, returnValue[1].dayOfMonth];
 * }
 * ```
 *
 * The full example would be:
 * @example
 * ```ts
 * const [data, render] = useConditionalHooks({
 *   currentDate: {
 *     hook: () => useCurrentDate(),
 *     changeDetector: (returnValue) => {
 *       return [returnValue[0], returnValue[1].dayOfWeek, returnValue[1].dayOfMonth];
 *     },
 *   }
 * });
 * ```
 *
 * To improve readability and TypeScript compatibility you can use `createConditionalHook` helper:
 * @example
 * ```ts
 * const [data, render] = useConditionalHooks({
 *   currentDate: createConditionalHook(() => useCurrentDate(), (returnValue) => {
 *     return [returnValue[0], returnValue[1].dayOfWeek, returnValue[1].dayOfMonth];
 *   }),
 * });
 * ```
 *
 * Bonus:
 * You can use changeDetector to save on re-renders. For example, with `useCurrentDate` if you are only interested in
 * day of week changes you can do:
 * ```ts
 * const [data, render] = useConditionalHooks({
 *   currentDate: createConditionalHook(() => useCurrentDate(), (returnValue) => {
 *     return [returnValue[1].dayOfWeek];
 *   }),
 * });
 * ```
 * and it will actually skip re-renders!
 *
 * One last thing: for your convenience object with hooks can contain `null` or `undefined` values. Such keys will be
 * included in the returned data object with `null` value.
 *
 * @example
 * ```ts
 * const [data, render] = useConditionalHooks({
 *   someState: createConditionalHook(() => useState(0)),
 *   optionalRequest: loadData ? createConditionalHook(() => useRequest("/path")) : null,
 * });
 * ```
 *
 * @param fns - object with hooks to run
 * @returns tuple with data object and render node
 */
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const hooks = Object.entries(fns).filter(([key, fn]) => Boolean(fn)) as [string, ConditionalHook<RT>][];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        mapValues(fns, (fn, key) => (fn ? data.current.get(String(key)) : null)) as any,

        // This fragment does not need a key, this returned array is not meant to be rendered as a whole
        // eslint-disable-next-line react/jsx-key
        <>
            {hooks.map(([key, fn]) => (
                <HookHandler
                    key={key}
                    hook={fn.hook}
                    fnKey={key}
                    changeDetector={fn.changeDetector}
                    onChange={handleChange}
                />
            ))}
        </>,
    ];
};

export type { ConditionalHook };
export { useConditionalHooks, createConditionalHook };


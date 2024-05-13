import { useState, useRef } from "react";

type ProxyRef<T> = ((newValue: T) => void) & { current: T };

/**
 * This hook allows you to create a ref that is proxied, so you have control over what is done with it later.
 * If you want to wrap an existing ref, use useForwardedProxyRef instead.
 * @param initialValue - your usual ref value
 * @param handler - handler of the Proxy that will wrap your value
 */
const useProxyRef = <T extends object | null | undefined>(
    initialValue: T, handler: ProxyHandler<Exclude<T, null | undefined>>,
): ProxyRef<T> => {
    const updateHandlerRef = useRef<(newHandler: typeof handler) => void>(() => {
        throw new Error("Impossible");
    });

    const [ref] = useState(() => {
        let value: T = initialValue, // storage for raw value that was given (not proxied)
            proxied: T = initialValue,
            currentHandler = handler;

        const setter = (newValue: T) => {
            value = newValue;
            proxied = value == null
                ? value
                : new Proxy(value, currentHandler);
        };

        // @ts-expect-error No way to handle it with TS
        const myRef: ProxyRef<T> = setter;
        Object.defineProperty(myRef, "current", {
            get: () => proxied,
            set: setter,
            enumerable: true,
        });

        updateHandlerRef.current = (newHandler) => {
            currentHandler = newHandler;

            setter(value);
        };

        setter(value);
        return myRef;
    });

    updateHandlerRef.current(handler);

    return ref;
};

export {
    useProxyRef,
};

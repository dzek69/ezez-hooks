import type { ForwardedRef } from "react";
import { useState, useRef } from "react";

import type { Primitives } from "./types";
import type { ProxyRef } from "./publicTypes";

/**
 * This hook allows you to wrap a forwarded ref with a proxy handler, so you have control over what is done with it
 * later. Unlike useImperativeHandle you can still expose full instance (external instanceof checks will work).
 * If you are not working with forwarded refs, use {@link useProxyRef} instead.
 * @param forwardedRef - ref that will be wrapped with a proxy
 * @param handler - handler of the Proxy that will wrap your value
 */
const useForwardedProxyRef = <T, NPT extends Exclude<T, Primitives>, F extends object & NPT>(
    forwardedRef: ForwardedRef<Exclude<T, Primitives>>, handler: ProxyHandler<Exclude<F, null | undefined>>,
): ProxyRef<T> => {
    const updateHandlerRef = useRef<(newHandler: typeof handler) => void>(() => {
        throw new Error("Impossible");
    });

    const [ref] = useState(() => {
        let value: NPT | null = null, // storage for raw value that was given (not proxied)
            proxied: NPT | null = value,
            currentHandler = handler;

        const setter = (newValue: NPT | null) => {
            value = newValue;
            proxied = value == null
                ? value
                : new Proxy(value, currentHandler);
            if (typeof forwardedRef === "function") {
                forwardedRef(proxied);
            }
            else if (forwardedRef) {
                // eslint-disable-next-line no-param-reassign
                forwardedRef.current = proxied;
            }
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

        return myRef;
    });

    updateHandlerRef.current(handler);

    return ref;
};

export {
    useForwardedProxyRef,
};


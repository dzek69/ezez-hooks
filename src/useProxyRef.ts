import type { MutableRefObject } from "react";
import { useState, useRef } from "react";

/**
 * This hook allows you to create a ref that is proxied, so you have control over what is done with it later.
 * @param defaultValue - the usual ref value
 * @param handler - proxy handler that will wrap your value
 */
const useProxyRef = <T extends object | null | undefined>(
    defaultValue: T, handler: ProxyHandler<Exclude<T, null | undefined>>,
): MutableRefObject<T> => {
    /**
     * Holds the raw, unproxied value
     */
    const rawStorage = useRef(defaultValue);
    /**
     * Holds the value we proxy and then expose
     */
    const storage = useRef(defaultValue);
    /**
     * Stores current proxy handler
     */
    const currentHandler = useRef(handler);
    currentHandler.current = handler;

    /**
     * This is ref-like value we will expose
     */
    const [exposed] = useState({});

    /**
     * Setter of exposed ref
     */
    const setter = (value: T) => {
        rawStorage.current = value;
        storage.current = rawStorage.current == null
            ? rawStorage.current
            : new Proxy(rawStorage.current, currentHandler.current);
    };

    /**
     * Prepare `current` property on exposed ref
     */
    if (!("current" in exposed)) {
        Object.defineProperty(exposed, "current", {
            get: () => storage.current,
            set: setter,
        });
    }

    /**
     * Make sure we react to handler changes
     */
    setter(rawStorage.current);

    return exposed as MutableRefObject<T>;
};

export {
    useProxyRef,
};

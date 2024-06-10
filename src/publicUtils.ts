// should be moved to ezez utils?

/**
 * This is a `get` method of a proxy handler that is just transparently allowing all reads.
 * Use it whenever you need to i.e., define `set` prop, but you don't want to write a full implementation of `get`.
 * @param target - target object
 * @param prop - property name
 * @param receiver - receiver object
 */
function proxyHandlerTransparentGet(target: unknown, prop: string | symbol, receiver: unknown) { // eslint-disable-line func-style
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const value = (target as Record<string, unknown>)[prop as keyof typeof target];

    if (typeof value !== "function") {
        return value;
    }

    // functions have to be wrapped to correctly preserve context (`this`)
    return function callProxyFn(this: unknown, ...args: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        return (value as (...any: unknown[]) => unknown).apply(this === receiver ? target : this, args);
    };
}

export {
    proxyHandlerTransparentGet,
};

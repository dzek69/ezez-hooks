type ProxyRef<T> = ((newValue: T) => void) & { current: T };

export type {
    ProxyRef,
};

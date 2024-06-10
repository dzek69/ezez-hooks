import { useRef } from "react";

import { memoize } from "@ezez/utils";

/**
 * Memoizes a function, caching the result of the last call. Call the returned function anytime you need.
 * If the function is called with the same arguments (and the same context!) again, it will return the cached result.
 *
 * It caches only the last call, so it's not suitable for functions that are called with different arguments in a short
 * time.
 *
 * Warning: Your function must be 100% pure, and it can't access anything dynamic outside its scope.
 *
 * @param fn - function to memoize
 * @returns memoized function
 *
 * @example
 * ```typescript
 * const sum = (a: number, b: number) => {
 *    console.log("Calculating sum");
 *    return a + b;
 * };
 * const memoizedSum = useMemoizedFn(sum);
 *
 * console.log(memoizedSum(1, 2)); // 3
 * return <button onClick={() => alert(memoizedSum(1, 2))}>Click me</button>;
 */
const useMemoizedFn = <A extends unknown[], R>(fn: (...args: A) => R): ((...args: A) => R) => {
    const fnRef = useRef<((...args: A) => R)>();
    if (!fnRef.current) {
        fnRef.current = memoize(fn);
    }
    return fnRef.current;
};

export {
    useMemoizedFn,
};

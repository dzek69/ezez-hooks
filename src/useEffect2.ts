import { useEffect, useRef } from "react";

const shallowCompareArrays = <T extends readonly any[]>(a: T, b: T) => { // eslint-disable-line @typescript-eslint/no-explicit-any, max-len
    if (a.length !== b.length) { return false; }
    for (let i = 0; i < a.length; i++) {
        if (!Object.is(a[i], b[i])) { return false; }
    }
    return true;
};

/**
 * Like `useEffect` but callback will be fired with previous dependencies. On initial render previous dependencies will
 * be undefined. You can pass a dynamic list of dependencies, and the effect will be called whenever there is a change.
 * Standard useEffect does not call the callback whenever deps array size changes.
 *
 * TypeScript tip: use `useEffect2(prev => {}, [dep1, dep2] as const)` to get correct type inference.
 *
 * @param callback - function to run when something changes
 * @param dependencies - array of dependencies
 *
 * @example
 * ```typescript
 * const { isAdmin, name } = useUserData(); // isAdmin is boolean, name is string
 *
 * useEffect2((prev) => {
 *     if (!prev) { return; } // Skip initial render
 *
 *     const [prevIsAdmin, prevName] = prev;
 *
 *     let message = "";
 *     if (prevName.toLowerCase() !== name.toLowerCase()) { // case-insensitive comparison, `as const` allows toLowerCase typesafe call
 *         message += `Your name changed from ${prev.name} to ${userData.name}`;
 *     }
 *     if (prevIsAdmin !== isAdmin) {
 *         if (!isAdmin) {
 *             message += "You are no longer an admin!";
 *         }
 *         else {
 *             message += "You are now an admin!";
 *         }
 *     }
 *     alert(message);
 * }, [isAdmin, name] as const);
 * ```
 */
const useEffect2 = <P, T extends (Readonly<P[]>)>(
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    callback: (previousDependencies: T | undefined) => void | (() => void), dependencies: T,
) => {
    const prevDependencies = useRef<T | undefined>(undefined);

    useEffect(() => {
        if (prevDependencies.current && shallowCompareArrays(prevDependencies.current, dependencies)) { return; }

        const p = prevDependencies.current;

        prevDependencies.current = dependencies;
        return callback(p);
    }); // no deps array - we compare deps manually anyway
};

export {
    useEffect2,
    useEffect2 as useDepEffect,
};

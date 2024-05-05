import { useCallback, useState } from "react";

/**
 * A hook that gives you the number of actions/promises that are currently running.
 * You can use that to display a spinner or something similar.
 * Call the returned function with a promise to automatically increase the counter. The counter will be decreased when
 * the promise is resolved or rejected.
 *
 * @example
 * ```tsx
 * const [busy, addBusy] = useBusy();
 * const api = useApi();
 * <button onClick={() => addBusy(api.loadThings())} disabled={busy !== 0}>Load things</button>
 * ```
 *
 * @returns A tuple with the number of currently running actions/promises and a function to add a promise to the
 * counter.
 */
const useBusy = <T>(): readonly [number, ((promise: Promise<T>) => Promise<T>)] => {
    const [number, setNumber] = useState(0);

    const cb = useCallback((promise: Promise<T>) => {
        setNumber(n => n + 1);
        promise.finally(() => {
            setNumber(n => n - 1);
        }).catch(() => undefined);
        return promise;
    }, [setNumber]);

    return [number, cb];
};

export {
    useBusy,
};

import { useEffect, useState } from "react";

const DEFAULT_UPDATE_INTERVAL = 1000;

/**
 * Forces component to update every interval set
 *
 * @example
 * ```tsx
 * const CurrentTime = () => {
 *     updateEvery(1000);
 *     return <div>Current time is: {new Date().toLocaleTimeString()}</div>;
 * }
 * ```
 *
 * @param everyMs - interval between updates, set it to 0 to stop the forced updates
 */
const useUpdateEvery = (everyMs: number = DEFAULT_UPDATE_INTERVAL): number => {
    const [s, setState] = useState(Date.now());

    useEffect(() => {
        if (!everyMs) {
            return;
        }

        const intervalId = setInterval(() => {
            setState(Date.now());
        }, everyMs);

        return () => {
            clearInterval(intervalId);
        };
    }, [everyMs]);

    return s;
};

export { useUpdateEvery };

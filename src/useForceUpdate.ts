import { useCallback, useState } from "react";

/**
 * A hook that returns a function that will force a component to re-render. Useful when you are working with imperative
 * code or broken libraries that don't update the state properly.
 *
 * @returns a function that will force a component to re-render when you call it
 * @example
 * ```tsx
 * const MyComponent = () => {
 *    const forceUpdate = useForceUpdate();
 *
 *    return (
 *        <div>
 *            Current time: {new Date().toLocaleTimeString()}
 *            <button onClick={forceUpdate}>Update</button>
 *        </div>
 *    );
 * });
 */
const useForceUpdate = (): () => void => {
    const [, setTick] = useState(0);
    return useCallback(() => {
        setTick(tick => tick + 1);
    }, []);
};

export {
    useForceUpdate,
};

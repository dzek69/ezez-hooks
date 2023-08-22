import { useEffect, useRef } from "react";

/**
 * Returns true on first render, false on all subsequent renders.
 */
const useIsFirstRender = () => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return isFirstRender.current;
};

export {
    useIsFirstRender,
};

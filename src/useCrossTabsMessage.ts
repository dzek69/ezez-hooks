import { useEffect, useRef } from "react";

import { useCrossTabs } from "./useCrossTabs";

/**
 * Wrapper around `useCrossTabs` that allows you to listen to messages from other tabs on a given channel.
 *
 * @param name
 * @param callback
 */
const useCrossTabsMessage = <T = any>(name: string, callback: (data: MessageEvent<T>) => void): void => { // eslint-disable-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any, max-len
    const bc = useCrossTabs(name);
    const prevBc = useRef(bc);
    const prevCallback = useRef(callback);

    // @TODO this can be replaced with useEffect2
    useEffect(() => {
        if (prevBc.current !== bc) {
            prevBc.current?.removeEventListener("message", prevCallback.current);
            bc?.addEventListener("message", callback);
            return;
        }

        bc?.removeEventListener("message", prevCallback.current);
        bc?.addEventListener("message", callback);
    }, [bc, callback]);

    // keep this hook last
    useEffect(() => {
        prevBc.current = bc;
    }, [bc]);

    useEffect(() => {
        prevCallback.current = callback;
    }, [callback]);
};

export {
    useCrossTabsMessage,
};

import { useEffect, useRef, useState } from "react";

import { Interval } from "oop-timers";

import { useCrossTabs } from "./useCrossTabs";

const SEND_PING_EVERY = 500;
const PING_TIMEOUT = 1024;

/**
 * Detects if there are multiple tabs open with the same hook running.
 * Usually you should use it at the top level of your application to prevent users from opening multiple tabs,
 * but if you prefer, you can set a custom channel name and use it in a specific parts of your application,
 * i.e., to detect if the same user had not opened some fragile "live" part of your application twice,
 * like a drawing board.
 *
 * @param name - channel name, optional, by default it's "@ezez/hooks/useDetectMultiTabs"
 */
const useDetectMultiTabs = (name = "@ezez/hooks/useDetectMultiTabs") => { // eslint-disable-line @typescript-eslint/no-shadow, max-len
    const bc = useCrossTabs(name);
    const [isMultiTab, setIsMultiTab] = useState(false);

    const intervalRef = useRef<Interval>(new Interval(() => {
        setIsMultiTab(false);
    }, PING_TIMEOUT));

    useEffect(() => {
        intervalRef.current.start();
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            intervalRef.current.stop();
        };
    }, []);

    useEffect(() => {
        const interval = new Interval(() => {
            bc.postMessage("ping");
        }, SEND_PING_EVERY, true, true);

        return () => {
            interval.stop();
        };
    }, [bc]);

    useEffect(() => {
        const callback = (e: MessageEvent) => {
            if (e.data === "ping") {
                setIsMultiTab(true);
                intervalRef.current.restartOnly();
            }
        };

        bc.addEventListener("message", callback);

        return () => {
            bc.removeEventListener("message", callback);
        };
    }, [bc]);

    return isMultiTab;
};

export {
    useDetectMultiTabs,
};

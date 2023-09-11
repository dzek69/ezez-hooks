import { useEffect, useRef } from "react";

import { useForceUpdate } from "./useForceUpdate";
import { useEffect2 } from "./useEffect2";

type InstanceData = {
    instance: BroadcastChannel;
    count: number;
};

const index: Record<string, InstanceData> = {};

const createInstance = (nname: string) => {
    if (!index[nname]) {
        index[nname] = {
            count: 1,
            instance: new BroadcastChannel(nname),
        };
        return index[nname]!.instance;
    }
    index[nname]!.count++;
    return index[nname]!.instance;
};

const removeInstance = (nname: string) => {
    if (!index[nname]) {
        console.error("IMPOSSIBLE: instance not found, yet asked to remove");
        return;
    }

    index[nname]!.count--;
    if (index[nname]!.count === 0) {
        index[nname]!.instance.close();
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete index[nname];
    }
};

/**
 * Basic hook wrapper for BroadcastChannel
 *
 * Important: if you use this hook twice in your application with the same channel name - you will get the same
 * BroadcastChannel instance.
 * You should not manually `.close()` it or other hooks using it will crash when posting a message.
 * This also means you will not receive messages from the same tab.
 * If you change the name,
 * the underlying instance (if not used by another hook call) will be closed and the returned instance will be updated.

 * @param name - channel name
 */
const useCrossTabs = (name: string) => { // eslint-disable-line @typescript-eslint/no-shadow
    const bcRef = useRef<BroadcastChannel>();
    if (bcRef.current === undefined && typeof BroadcastChannel !== "undefined") {
        bcRef.current = createInstance(name);
    }
    const update = useForceUpdate();

    useEffect2((prev) => {
        if (!prev) { return; }
        const [prevName] = prev;
        removeInstance(prevName);
        bcRef.current = createInstance(name);
        update();
    }, [name] as const);

    useEffect(() => {
        return () => {
            removeInstance(bcRef.current!.name);
        };
    }, []);

    return bcRef.current;
};

export {
    useCrossTabs,
};

import React, { useCallback } from "react";

import { rethrow, wait } from "@ezez/utils";

import { useBusy } from "../../useBusy.js";

const FAKE_WAIT_TIME = 2000;

const UseBusyMain: React.FC = () => {
    const [busy, addBusy] = useBusy();

    const handleAddFakeTask = useCallback(() => {
        addBusy(wait(FAKE_WAIT_TIME)).catch(rethrow);
    }, [addBusy]);

    return (
        <>
            <button onClick={handleAddFakeTask}>add a task</button><br />
            ongoing tasks: {busy}<br />
            <button disabled={Boolean(busy)}>this will be disabled if something is happening</button>
        </>
    );
};

export { UseBusyMain };

import React, { useCallback, useEffect, useState } from "react";

import { useEffect2 } from "../../useEffect2";
import { useForceUpdate } from "../../useForceUpdate";

interface Props {}

const init: never[] = [];
const then = [1];

const UseEffect2Deps: React.FC<Props> = () => {
    const [useInit, setUseInit] = useState(false);
    const handleUpdate = useForceUpdate();

    useEffect(() => {
        console.info("Trigger useEffect!");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, useInit ? init : then);

    useEffect2(() => {
        console.info("Trigger useEffect2!");
    }, useInit ? init : then);

    const handleChange = useCallback(() => {
        setUseInit((prev) => !prev);
    }, []);

    return (
        <div>
            <div>useInit: {useInit ? "init" : "then"}</div>
            <button onClick={handleChange}>Change</button>
            <br />
            <button onClick={handleUpdate}>Force update</button> - {Date.now()}
        </div>
    );
};

export { UseEffect2Deps };

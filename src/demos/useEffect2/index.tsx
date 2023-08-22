import React, { useCallback, useState } from "react";

import { useEffect2 } from "../../useEffect2";

interface Props {}

// eslint-disable-next-line max-lines-per-function
const UseEffect2: React.FC<Props> = () => {
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState("lorem");
    const [log, setLog] = useState("");

    const handleChange1 = useCallback(() => {
        setValue1((prev) => prev + 1);
    }, []);

    const handleChange2 = useCallback(() => {
        setValue2((prev) => (prev === "lorem" ? "ipsum" : "lorem"));
    }, []);

    const handleChangeBoth = useCallback(() => {
        handleChange1();
        handleChange2();
    }, [handleChange1, handleChange2]);

    const appendLog = useCallback((text: string) => {
        setLog((prev) => prev + text + "\n");
    }, []);

    useEffect2((changes) => {
        if (!changes) {
            appendLog("Initial render, no changes");
            return;
        }

        const [prev1, prev2] = changes;

        console.info({
            prev1, prev2, value1, value2,
        });

        if (prev1 !== value1 && prev2 !== value2) {
            appendLog(`Both changed: value 1 from ${prev1} to ${value1}, value 2 from ${prev2} to ${value2}`);
        }
        else if (prev1 !== value1) {
            appendLog(`Value 1 changed from ${prev1} to ${value1}`);
        }
        else {
            appendLog(`Value 2 changed from ${prev2} to ${value2}`);
        }
    }, [value1, value2] as const);

    return (
        <div>
            <div>value1: {value1}</div>
            <div>value2: {value2}</div>
            <button onClick={handleChange1}>Change value 1</button>
            <button onClick={handleChange2}>Change value 2</button>
            <button onClick={handleChangeBoth}>Change both at once!</button>
            <br />

            Log:
            <pre>
                {log}
            </pre>
        </div>
    );
};

export { UseEffect2 };

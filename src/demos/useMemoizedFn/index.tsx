import React, { useState } from "react";

import { useMemoizedFn } from "../../useMemoizedFn";

const UseMemoizedFn: React.FC = () => {
    const [calcCount, setCalcCount] = useState(0);
    const [a, setA] = useState("0");
    const [b, setB] = useState("0");
    const [result, setResult] = useState(0);

    const sum = useMemoizedFn((aa: number, bb: number) => {
        console.info("calculating sum");
        setCalcCount((prev) => prev + 1);
        setResult(aa + bb);
        return aa + bb;
    });

    if (typeof window === "object") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-type-assertion
        (window as any).sum = sum; // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        sum(Number(a), Number(b));
        sum(Number(a), Number(b));
        sum(Number(a), Number(b));
        e.preventDefault();
    };

    return (
        <div>
            In this example we memoize a function that calculates the sum of two numbers.
            {" "}The function is called three times on each form submit.
            {" "}The calculation count is displayed below the form.
            <form onSubmit={handleSubmit}>
                A: <input type={"number"} value={a} onChange={(e) => { setA(e.target.value); }} />
                B: <input type={"number"} value={b} onChange={(e) => { setB(e.target.value); }} />
                <br />
                Result: {result}
                <br />
                <button>Sum it!</button>
                <hr />
                Calculation count: {calcCount}
            </form>
        </div>
    );
};

export { UseMemoizedFn };

/* eslint-disable react/jsx-no-bind, react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";

import { createConditionalHook, useConditionalHooks } from "../../useConditionalHooks.js";

import { getRandomName, useNumberAndObject } from "./utils.js";

// This is a hook that will be called conditionally
const optionalHook = {
    hook: () => useState(() => {
        console.info("getting initial state for numeric hook");
        return getRandomName();
    }),
};

const UseConditionalHooksState: React.FC = (props) => {
    console.info("render!");

    // Controls if extra hook is called
    const [extraHookPlease, setExtraHookPlease] = useState(false);

    const [data, render] = useConditionalHooks({
        optionalRandomName: extraHookPlease ? optionalHook : null,
        randomNumberHook: {
            hook: () => useState(() => {
                // useState is defined with functional default state, so it's easier to see that state is retained
                console.info("getting initial state for string hook (last)");
                return Math.random();
            }),
        },
        optimizedHook: createConditionalHook(() => useNumberAndObject(), (value) => [value[0]]),
    });

    useEffect(() => {
        console.info("Optimized hook changed!");
    }, [data.optimizedHook]);

    return (
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {render}

            <button
                onClick={() => {
                    data.randomNumberHook?.[1]?.(Math.random());
                }}
            >
                Change random number hook value
            </button>

            <button onClick={() => { setExtraHookPlease(p => !p); }}>
                Toggle extra hook
            </button>
        </div>
    );
};

export { UseConditionalHooksState };

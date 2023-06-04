/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import { last, truthy } from "@ezez/utils";

import { useConditionalHooks } from "../useConditionalHooks.js";

const optionalHook = {
    key: "s",
    // eslint-disable-next-line react-hooks/rules-of-hooks
    hook: () => useState(() => {
        console.info("getting initial state for numeric hook");
        return 1;
    }),

};

const Index: React.FC = (props) => {
    console.info("index render!");

    const [twoHooksPlease, setTwoHooksPlease] = useState(false);

    const dynamicListOfHooks = [
        twoHooksPlease ? optionalHook : undefined,
        {
            key: "s2",
            // eslint-disable-next-line react-hooks/rules-of-hooks
            hook: () => useState(() => {
                console.info("getting initial state for string hook (last)");
                return "s";
            }),
        },
    ].filter(truthy);

    const [data, render] = useConditionalHooks(dynamicListOfHooks);

    return (
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {render}

            <button
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any
                    last(data)?.[1]?.(String(Math.random()) as any);
                }}
            >
                change last state
            </button>

            <button onClick={() => { setTwoHooksPlease(p => !p); }}>
                toggle extra hook
            </button>
        </div>
    );
};

export default Index;

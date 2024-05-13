import React, { useCallback, useRef, useState } from "react";

import { useProxyRef } from "../../useProxyRef";

interface Props {}

const noDucksProxy: ProxyHandler<HTMLInputElement | HTMLTextAreaElement> = {
    set(input, prop, value) {
        console.info("setting value on ducks proxy", value, input.value, value === input.value);

        if (value === "duck") {
            console.error("No ducks allowed!");
            return true;
        }

        if (prop === "value" && typeof value === "string") {
            // eslint-disable-next-line no-param-reassign
            input[prop] = value;
        }
        return true;
    },
};

const noChickenProxy: ProxyHandler<HTMLInputElement | HTMLTextAreaElement> = {
    set(input, prop, value) {
        console.info("setting value on chicken proxy", value, input.value, value === input.value);

        if (value === "chicken") {
            console.error("No chickens allowed!");
            return true;
        }

        if (prop === "value" && typeof value === "string") {
            // eslint-disable-next-line no-param-reassign
            input[prop] = value;
        }
        return true;
    },
};

const UseProxyRef: React.FC<Props> = () => {
    const renderCount = useRef(0);
    const [number, setNumber] = useState(0); // just to trigger re-renders

    const [currentProxy, setCurrentProxy] = useState<ProxyHandler<HTMLInputElement | HTMLTextAreaElement>>(noDucksProxy);

    const ref = useProxyRef<HTMLInputElement | null>(null, currentProxy);

    const setRefValue = (value: string) => {
        if (!ref.current) {
            console.error("No ref!");
            return;
        }
        ref.current.value = value;
    };

    return (
        <div>
            Currently set proxy: {currentProxy === noDucksProxy ? "ducks preventing proxy" : "chicken preventing proxy"}
            <button onClick={() => { setCurrentProxy(noDucksProxy); }}>set proxy to ducks</button>
            <button onClick={() => { setCurrentProxy(noChickenProxy); }}>set proxy to chicken</button>
            <hr />
            Input ref #{number}:
            <input key={number} ref={ref} />
            <button onClick={() => { setNumber(p => p + 1); }}>Change ref</button>
            <hr />
            Value manipulation:
            <button onClick={() => { setRefValue("lorem"); }}>call ref.current.value = "lorem";</button>
            <button onClick={() => { setRefValue("duck"); }}>call ref.current.value = "duck";</button>
            <button onClick={() => { setRefValue("chicken"); }}>call ref.current.value = "chicken";</button>
        </div>
    );
};

export { UseProxyRef };

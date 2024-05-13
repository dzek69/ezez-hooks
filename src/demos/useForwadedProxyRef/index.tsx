import React, { forwardRef, useRef, useState } from "react";

import { useForwardedProxyRef } from "../../useForwardedProxyRef";

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
// @ts-expect-error Just a debug helper
noDucksProxy.name = "No ducks";

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
// @ts-expect-error Just a debug helper
noChickenProxy.name = "No chicken";

const Input = forwardRef<
HTMLInputElement | null, { proxy: ProxyHandler<HTMLInputElement | HTMLTextAreaElement> }
>((props, ref) => {
    const theRef = useForwardedProxyRef(ref, props.proxy);

    // const standardRef = useRef<Date | number | null>(5);
    // const wrapped = useForwardedProxyRef(standardRef, {});
    // console.info("Standard ref", { wrapped, standardRef });

    return (
        <input ref={theRef} />
    );
});

// eslint-disable-next-line react/no-multi-comp
const UseForwardedProxyRef: React.FC<Props> = () => {
    const [number, setNumber] = useState(0); // just to trigger re-renders

    const [currentProxy, setCurrentProxy] = useState<
    ProxyHandler<HTMLInputElement | HTMLTextAreaElement>
    >(noDucksProxy);

    const ref = useRef<HTMLInputElement | null>(null);

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
            Input ref #{number}: <hr />
            <Input key={number} ref={ref} proxy={currentProxy} />
            <button onClick={() => { setNumber(p => p + 1); }}>Change ref</button>
            <hr />
            Value manipulation:
            <button onClick={() => { setRefValue("lorem"); }}>call ref.current.value = "lorem";</button>
            <button onClick={() => { setRefValue("duck"); }}>call ref.current.value = "duck";</button>
            <button onClick={() => { setRefValue("chicken"); }}>call ref.current.value = "chicken";</button>
        </div>
    );
};

export { UseForwardedProxyRef };

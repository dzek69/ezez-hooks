import React from "react";

import { useIsFirstRender } from "../../useIsFirstRender";
import { useForceUpdate } from "../../useForceUpdate";

interface Props {}

const UseIsFirstRender: React.FC<Props> = () => {
    const is = useIsFirstRender();
    const update = useForceUpdate();

    return (
        <div>
            <div>Is first render: {is.toString()}</div>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <button onClick={update}>Re-render component</button>
        </div>
    );
};

export { UseIsFirstRender };

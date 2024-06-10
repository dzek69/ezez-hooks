import React from "react";

import { useIsFirstRender } from "../../useIsFirstRender";
import { useForceUpdate } from "../../useForceUpdate";

const UseIsFirstRender: React.FC = () => {
    const is = useIsFirstRender();
    const update = useForceUpdate();

    return (
        <div>
            <div>Is first render: {is.toString()}</div>
            <button onClick={update}>Re-render component</button>
        </div>
    );
};

export { UseIsFirstRender };

import React from "react";

import { useForceUpdate } from "../../useForceUpdate.js";

interface Props {}

const UseForceUpdateMain: React.FC<Props> = () => {
    const update = useForceUpdate();

    return (
        <div>
            Current time: {new Date().toLocaleTimeString()}
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <button onClick={update}>
                Update
            </button>
        </div>
    );
};

export { UseForceUpdateMain };

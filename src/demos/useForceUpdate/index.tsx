import React from "react";

import { useForceUpdate } from "../../useForceUpdate.js";

const UseForceUpdateMain: React.FC = () => {
    const update = useForceUpdate();

    return (
        <div>
            Current time: {new Date().toLocaleTimeString()}
            <button onClick={update}>
                Update
            </button>
        </div>
    );
};

export { UseForceUpdateMain };

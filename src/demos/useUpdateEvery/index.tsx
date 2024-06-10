import React from "react";

import { useUpdateEvery } from "../../useUpdateEvery.js";

const UseUpdateEveryMain: React.FC = () => {
    useUpdateEvery();

    return (
        <div>It is {new Date().toLocaleTimeString()} now</div>
    );
};

export { UseUpdateEveryMain };

import React from "react";

import { useUpdateEvery } from "../../useUpdateEvery.js";

interface Props {}

const UseUpdateEveryMain: React.FC<Props> = (props) => {
    useUpdateEvery();

    return (
        <div>It is {new Date().toLocaleTimeString()} now</div>
    );
};

export { UseUpdateEveryMain };

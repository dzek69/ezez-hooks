import React from "react";

import { useSimpleGeolocation } from "../../useSimpleGeolocation.js";

interface Props {}

const UseSimpleGeolocationMain: React.FC<Props> = (props) => {
    const data = useSimpleGeolocation();

    return (
        <div>
            Your current location: {data.join(", ")}
        </div>
    );
};

export { UseSimpleGeolocationMain };

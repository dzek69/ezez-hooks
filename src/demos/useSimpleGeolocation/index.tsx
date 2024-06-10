import React from "react";

import { useSimpleGeolocation } from "../../useSimpleGeolocation.js";

const UseSimpleGeolocationMain: React.FC = () => {
    const data = useSimpleGeolocation();

    return (
        <div>
            Your current location: {data.join(", ")}
        </div>
    );
};

export { UseSimpleGeolocationMain };

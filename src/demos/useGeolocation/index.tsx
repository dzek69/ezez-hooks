import React from "react";

import { useGeolocation } from "../../useGeolocation.js";

const UseGeolocationMain: React.FC = () => {
    const data = useGeolocation();

    return (
        <div>
            Your current location:
            {data?.latitude ?? "-"},
            {data?.longitude ?? "-"}
        </div>
    );
};

export { UseGeolocationMain };

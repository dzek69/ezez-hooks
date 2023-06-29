import React from "react";

import { useGeolocation } from "../../useGeolocation.js";

interface Props {}

const UseGeolocationMain: React.FC<Props> = (props) => {
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

import { useGeolocation } from "./useGeolocation.js";

/**
 * Returns simplified geolocation data. It returns an array of [latitude, longitude, accuracy].
 */
const useSimpleGeolocation = (enable = true, options?: PositionOptions) => {
    const data = useGeolocation(enable, options);
    return data ? [data.latitude, data.longitude, data.accuracy] : [0, 0, 0];
};

export {
    useSimpleGeolocation,
};

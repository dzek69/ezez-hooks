import { useEffect, useRef } from "react";

import { useForceUpdate } from "./useForceUpdate.js";

// geolocation props are not enumerable, so we need to get them manually
const props = (
    typeof GeolocationCoordinates === "undefined"
        ? []
        : Object.getOwnPropertyNames(GeolocationCoordinates.prototype)
) as (keyof GeolocationCoordinates)[];

const defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
};

/**
 * A hook that returns the current geolocation. It will update the geolocation when the user moves. You can temporarily
 * disable the geolocation by passing false as `enable` parameter.
 */
const useGeolocation = (enable = true, options?: PositionOptions) => {
    const update = useForceUpdate();
    const pos = useRef<GeolocationPosition>();

    useEffect(() => {
        const id = navigator.geolocation.watchPosition((loc) => {
            const somethingChanged = props.some((prop) => loc.coords[prop] !== pos.current?.coords[prop]);
            if (somethingChanged) {
                pos.current = loc;
                update();
            }
        }, () => { pos.current = undefined; update(); }, options ?? defaultOptions);

        return () => {
            navigator.geolocation.clearWatch(id);
        };
    }, [enable, Object.values(options ?? {})]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!pos.current) {
        return null;
    }

    return pos.current.coords;
};

export {
    useGeolocation,
};

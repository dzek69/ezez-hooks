import React from "react";

import { useInputDevice } from "../../useInputDevice.js";

interface Props {}

const big: React.CSSProperties = {
    padding: "1em",
};

const handleSave = () => {
    alert("Saved!");
};

const UseInputDeviceMain: React.FC<Props> = (props) => {
    const dev = useInputDevice("");

    const isTouch = dev !== "mouse";

    return (
        <>
            {!dev ? "We don't know what device you're using, so we will use touch version" : `You're using ${dev}`}
            <br />
            {isTouch
                ? "We've made the button bigger for you, so it's easier to touch it and we added a label, "
                + "because you can't hover to see the title"
                : "The button has normal size, mouse is precise"}

            <br />
            <button style={isTouch ? big : {}} title={"Save"} onClick={handleSave}>{isTouch && "Save "}💾</button>

            <br />
            <br />
            If you're on computer without touch screen, you can emulate touch events in Chrome DevTools.
        </>
    );
};

export { UseInputDeviceMain };

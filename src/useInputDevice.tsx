import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Supported input devices
 */
type InputDevices = "mouse" | "touch";
/**
 * Possible returned values from `useInputDevice` hook
 */
type StateDevices = InputDevices | "";
/**
 * Context values for `InputDeviceContext`, `missing-input-device-provider` will never be returned by the hook. Missing
 * provider will throw an error.
 */
type ContextDevices = StateDevices | "missing-input-device-provider";

interface Props {
    children: ReactNode;
}

const InputDeviceContext = createContext<ContextDevices>("missing-input-device-provider");
InputDeviceContext.displayName = "InputDeviceContext";

const IGNORE_MOUSE_EVENTS_AFTER_TOUCH_FOR = 350;

/**
 * A Provider component for `useInputDevice` hook. Mount it at the top of your app.
 *
 * @param props - provider props, only children are used
 */
const InputDeviceProvider: React.FC<Props> = (props) => {
    const [device, setDevice] = useState<InputDevices | "">("");

    useEffect(() => {
        let lastEvent = 0;

        const mouse = () => {
            if (Date.now() - lastEvent < IGNORE_MOUSE_EVENTS_AFTER_TOUCH_FOR) {
                // Skipping mouse events for a while after touch events to avoid fake mouse events on touch
                // See: https://web.dev/mobile-touchandmouse/#:~:text=Secondly%2C%20when%20a%20user%20taps
                return;
            }
            lastEvent = Date.now();
            setDevice("mouse");
        };

        const touch = () => {
            lastEvent = Date.now();
            setDevice("touch");
        };

        window.addEventListener("mousemove", mouse);
        window.addEventListener("wheel", mouse);
        window.addEventListener("touchmove", touch);
        window.addEventListener("touchend", touch);

        return () => {
            window.removeEventListener("wheel", mouse);
            window.removeEventListener("mousemove", mouse);
            window.removeEventListener("touchmove", touch);
            window.removeEventListener("touchend", touch);
        };
    }, []);

    return <InputDeviceContext.Provider value={device}>{props.children}</InputDeviceContext.Provider>;
};

/**
 * Returns the currently active input device, it enables the user to switch input devices freely and allows your app
 * to react accordingly.
 *
 * If the user touches the screen, it will return "touch". If the user actively uses the mouse, it will switch to
 * "mouse" until the user touches the screen again.
 *
 * By default, before first interaction empty string is returned, you can override that by passing your own default.
 *
 * You need to mount InputDeviceProvider somewhere in the tree above the component that uses this hook!
 *
 * @example
 * ```tsx
 * // Render bigger button on touch devices
 * const inputDevice = useInputDevice();
 * return <Button size={inputDevice === "mouse" ? "normal" : "big"}>Click me!</Button>;
 * ```
 *
 * @param overrideDefault - overrides the default value returned before first interaction
 * @returns currently active input device, `mouse` | `touch` | `""` (empty string) | (your custom default)
 */
const useInputDevice = <T extends string>(overrideDefault?: T): StateDevices | T => {
    const contextValue = useContext(InputDeviceContext);
    if (contextValue === "missing-input-device-provider") {
        throw new Error("InputDeviceProvider is missing in the tree");
    }
    return contextValue || (overrideDefault ?? "");
};

export {
    InputDeviceProvider,
    useInputDevice,
};

export type {
    StateDevices,
    InputDevices,
    Props as InputDeviceProviderProps,
};

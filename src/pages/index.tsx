import React from "react";

import Link from "next/link";

// eslint-disable-next-line max-lines-per-function
const Index: React.FC = () => {
    return (
        <div>
            At the moment this serves the purpose of a playground and testing ground for the hooks. Feel free to look
            around, but the proper demos will come some day.

            JSDoc is used to document the hooks, list of hooks is in the README.
            <ul>
                <li>
                    <Link href={"/useBusy"}>useBusy</Link>
                </li>
                <li>
                    useConditionalHook
                    <ul>
                        <li>
                            <Link href={"/useConditionalHooks/state"}>State demo</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={"/useCrossTabs"}>useCrossTabs</Link>
                </li>
                <li>
                    <Link href={"/useCrossTabsMessage"}>useCrossTabsMessage</Link>
                </li>
                <li>
                    <Link href={"/useDetectMultiTabs"}>useDetectMultiTabs</Link>
                </li>
                <li>
                    useEffect2
                    <ul>
                        <li>
                            <Link href={"/useEffect2"}>Basic demo</Link>
                        </li>
                        <li>
                            <Link href={"/useEffect2/deps"}>useEffect2 dynamic deps array test</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={"/useForceUpdate"}>useForceUpdate</Link>
                </li>
                <li>
                    <Link href={"/useForwardedProxyRef"}>useForwardedProxyRef</Link>
                </li>
                <li>
                    <Link href={"/useGeolocation"}>useGeolocation</Link>
                </li>
                <li>
                    <Link href={"/useInputDevice"}>useInputDevice</Link>
                </li>
                <li>
                    <Link href={"/useIsFirstRender"}>useIsFirstRender</Link>
                </li>
                <li>
                    <Link href={"/useProxyRef"}>useProxyRef</Link>
                </li>
                <li>
                    <Link href={"/useSimpleGeolocation"}>useSimpleGeolocation</Link>
                </li>
                <li>
                    <Link href={"/useToday"}>useToday</Link>
                </li>
                <li>
                    <Link href={"/useUpdateEvery"}>useUpdateEvery</Link>
                </li>
            </ul>
        </div>
    );
};

export default Index;

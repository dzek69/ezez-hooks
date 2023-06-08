import React from "react";

import Link from "next/link";

const Index: React.FC = (props) => {
    return (
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
                <Link href={"/useInputDevice"}>useInputDevice</Link>
            </li>
            <li>
                <Link href={"/useToday"}>useToday</Link>
            </li>
            <li>
                <Link href={"/useUpdateEvery"}>useUpdateEvery</Link>
            </li>
        </ul>
    );
};

export default Index;

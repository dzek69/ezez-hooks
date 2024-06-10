import React from "react";

import { useDetectMultiTabs } from "../../useDetectMultiTabs";

const UseDetectMultiTabs: React.FC = () => {
    const isMulti = useDetectMultiTabs();

    return (
        <div>
            Is this page opened in multiple tabs? {String(isMulti)}
            <hr />
            You have to open this particular page in multiple tabs to see the effect.
        </div>
    );
};

export { UseDetectMultiTabs };

import React from "react";

import { useToday } from "../../useToday.js";

const UseTodayMain: React.FC = () => {
    const today = useToday();

    return (
        <>
            Today starts at {today.toISOString()} (this is ISO format, it has unified timezone)<br /><br />
            Check this page again tomorrow to see the date change.
        </>
    );
};

export { UseTodayMain };

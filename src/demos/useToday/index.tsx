import React from "react";

import { useToday } from "../../useToday.js";

interface Props {}

const UseTodayMain: React.FC<Props> = (props) => {
    const today = useToday();

    return (
        <>
            Today starts at {today.toISOString()} (this is ISO format, it has unified timezone)<br /><br />
            Check this page again tomorrow to see the date change.
        </>
    );
};

export { UseTodayMain };

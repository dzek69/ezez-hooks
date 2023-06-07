import { useEffect, useState } from "react";

const DEFAULT_INTERVAL = 5000;

const startOfDay = (date: number | Date) => {
    const d = typeof date === "number" ? new Date(date) : new Date(date.getTime());
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    return d;
};

/**
 * A hook that returns the current date at midnight. It will update the date at midnight. You can change the check
 * interval by passing a number of milliseconds to the hook. By default it will check every 5 seconds.
 *
 * @param checkInterval - the number of milliseconds to wait between checks
 * @returns The current date at midnight, as a Date object.
 */
const useToday = (checkInterval = DEFAULT_INTERVAL) => {
    const [today, setToday] = useState(startOfDay(new Date()));

    useEffect(() => {
        let lastDate = new Date();
        const int = setInterval(() => {
            const newDate = new Date();
            if (lastDate.getDate() !== newDate.getDate()) {
                setToday(startOfDay(newDate));
                lastDate = newDate;
            }
        }, checkInterval);

        return () => {
            clearInterval(int);
        };
    }, [checkInterval]);

    return today;
};

export {
    useToday,
};

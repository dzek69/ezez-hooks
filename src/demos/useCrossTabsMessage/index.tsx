import React, { useCallback, useEffect, useState } from "react";

import { useCrossTabs } from "../../useCrossTabs";
import { useCrossTabsMessage } from "../../useCrossTabsMessage";

interface Props {}

const randomWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
];

const pickRandomElement = () => {
    const index = Math.floor(Math.random() * randomWords.length);
    return randomWords[index]!;
};

const RANDOM_MESSAGE_INTERVAL = 1000;

const UseCrossTabsMessage: React.FC<Props> = () => {
    const [channel, setChannel] = useState(1);
    const [callback, setCallback] = useState(1);

    const ct = useCrossTabs(`ezez${channel}`);

    const [messages, setMessages] = useState<string[]>([]);

    useCrossTabsMessage<string>(`ezez${channel}`, useCallback((msg) => {
        setMessages((prev) => [...prev, "RCV: " + msg.data]);
    }, [callback])); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const interval = setInterval(() => {
            const msg = pickRandomElement();
            ct.postMessage(msg);
            setMessages((prev) => [...prev, "SNT: " + msg]);
        }, RANDOM_MESSAGE_INTERVAL);

        return () => {
            clearInterval(interval);
        };
    }, [ct]);

    return (
        <div>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <button onClick={() => { setCallback(p => p + 1); }}>Increase callback</button>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <button onClick={() => { setChannel(p => p + 1); }}>Increase channel</button>

            Open this page in multiple tabs.
            Each tab will send a random messages and they will be printed here.

            {messages.map((m, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i}>{m}</div>
            ))}
        </div>
    );
};

export { UseCrossTabsMessage };

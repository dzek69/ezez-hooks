import React, { useCallback, useEffect } from "react";

import { useCrossTabs } from "../../useCrossTabs";

interface Props {}

const UseCrossTabs: React.FC<Props> = () => {
    const ct = useCrossTabs("ezez");

    const [text, setText] = React.useState("");
    const [messages, setMessages] = React.useState<string[]>([]);

    const handleSubmit: React.FormEventHandler = useCallback((e) => {
        e.preventDefault();
        ct.postMessage(text);
        setText("");
    }, [ct, text]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setText(e.target.value);
    }, []);

    useEffect(() => {
        const listener = (e: MessageEvent) => {
            setMessages((prev) => [...prev, JSON.stringify(e.data)]);
        };

        ct.addEventListener("message", listener);

        return () => {
            ct.removeEventListener("message", listener);
        };
    }, [ct]);

    return (
        <div>
            <div>send a message to other tabs</div>
            <form onSubmit={handleSubmit}>
                <input type={"text"} name={"message"} value={text} onChange={handleChange} />
                <button>send</button>
            </form>

            <div>
                messages received from the other tabs:
                {messages.map((m, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i}>{m}</div>
                ))}
            </div>
        </div>
    );
};

export { UseCrossTabs };

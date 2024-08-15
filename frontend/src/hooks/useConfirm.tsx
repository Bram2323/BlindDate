import { useState } from "react";
import { Button } from "../generic/Button";

export function useConfirm(): [
    JSX.Element,
    (text: string, callback: () => void) => void
] {
    const [active, setActive] = useState(false);
    const [text, setText] = useState("");
    const [callback, setCallback] = useState(() => () => {});

    function confirm(text: string, callback: () => void) {
        console.log("2");
        setActive(true);
        setText(text);
        console.log("3");
        setCallback(() => callback);
        console.log("4");
    }

    function cancel() {
        setActive(false);
    }

    function accept() {
        console.log("7", callback);
        setActive(false);
        callback();
        console.log("8");
    }

    const element = (
        <>
            {active && (
                <div className="z-50 fixed w-full h-full bg-black bg-opacity-10">
                    {text}
                    <div className="flex">
                        <Button content="Yes" handleClick={accept} />
                        <Button content="No" handleClick={cancel} />
                    </div>
                </div>
            )}
        </>
    );

    return [element, confirm];
}

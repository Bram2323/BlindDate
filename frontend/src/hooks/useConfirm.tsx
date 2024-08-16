import { useState } from "react";
import { Button } from "../generic/Button";

export function useConfirm(): [
    JSX.Element,
    (text: string[], callback: () => void) => void
] {
    const [active, setActive] = useState(false);
    const [text, setText] = useState<string[]>([]);
    const [callback, setCallback] = useState(() => () => {});

    function confirm(text: string[], callback: () => void) {
        setActive(true);
        setText(text);
        setCallback(() => callback);
    }

    function cancel() {
        setActive(false);
    }

    function accept() {
        setActive(false);
        callback();
    }

    const element = (
        <>
            {active && (
                <div className="z-50 fixed w-full h-full bg-black bg-opacity-10 flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center justify-center gap-2 bg-gray-100 p-4 rounded-xl border-4 border-gray-600 shadow-xl">
                        <div className="flex flex-col items-center justify-center">
                            {text.map((row, index) => (
                                <p key={index}>{row}</p>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button content="Yes" handleClick={accept} />
                            <Button content="No" handleClick={cancel} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    return [element, confirm];
}

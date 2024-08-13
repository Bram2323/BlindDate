import React, { useEffect, useState } from "react";

export const Warning = ({ message, duration, warningColor }) => {
    const [error, setError] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);

    useEffect(() => {
        console.log(message);
        if (message != "") {
            showError(message);
        }
    }, [message]);

    const showError = (message: string) => {
        console.log("running");
        setError(message);
        setHidden(false);
        setTimeout(() => {
            setHidden(true);
            setError("");
        }, duration);
    };

    return (
        <div
            className={`${
                hidden ? "collapse" : ""
            } ${warningColor} text-white font-extrabold w-48 p-4 rounded-lg absolute top-1/4 left-1/4 z-20`}
        >
            {error}
        </div>
    );
};

interface WarningProps {
    message: string;
    duration: number;
    warningColor: string;
}
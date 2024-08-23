import React, { useEffect, useState } from "react";

export const Warning: React.FC<WarningProps> = ({
    message,
    duration,
    warningColor,
}) => {
    const [error, setError] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);

    useEffect(() => {
        if (message != "") {
            showError(message);
        }
    }, [message]);

    const showError = (message: string) => {
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
            } ${warningColor} text-white font-extrabold w-48 p-4 rounded-lg absolute top-2 left-2 z-20`}
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

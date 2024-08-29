import React from "react";

export const Button: React.FC<ButtonProps> = ({
    content,
    style,
    id,
    handleClick,
}) => {
    const defaultStyle =
        "bg-blue-600 hover:bg-blue-400 border-3 border-blue-600 text-white font-bold rounded tracking-wider transition";
    return (
        <>
            <button
                id={id ? id : ""}
                className={`${defaultStyle} ${style} py-2 px-4`}
                onClick={handleClick}
            >
                {content}
            </button>
        </>
    );
};

interface ButtonProps {
    content: string;
    style?: string;
    id?: string;
    handleClick: () => void;
}

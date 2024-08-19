import React from "react";

export const Button: React.FC<ButtonProps> = ({
    content,
    style,
    handleClick,
}) => {
    const defaultStyle =
        "bg-feminine-primary hover:bg-feminine-primary-dark font-bold rounded text-white tracking-wider border-feminine-primary";
    return (
        <>
            <button
                className={`${defaultStyle} ${style} border-2 p-2`}
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
    handleClick: () => void;
}

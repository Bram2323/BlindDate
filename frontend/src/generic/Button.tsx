import React from "react";

export const Button: React.FC<ButtonProps> = ({
    content,
    style,
    handleClick,
}) => {
    const defaultStyle =
        "bg-feminine-primary hover:bg-feminine-primary-dark font-bold py-2 rounded text-white tracking-wider border-feminine-primary";
    const styling = style === undefined ? defaultStyle : style;
    return (
        <>
            <button
                className={`${styling} border-2 p-2 mb-2`}
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

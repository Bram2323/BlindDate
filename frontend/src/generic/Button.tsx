import React from "react";

export const Button: React.FC<ButtonProps> = ({
    content,
    style,
    handleClick,
}) => {
    return (
        <div>
            <button className={`${style} border-2 p-2`} onClick={handleClick}>
                {content}
            </button>
        </div>
    );
};

interface ButtonProps {
    content: string;
    style?: string;
    handleClick: () => void;
}

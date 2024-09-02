import React from "react";

export const LabelBox: React.FC<LabelBoxProps> = ({ content, style }) => {
    return (
        <span
            className={`${style} text-center font-bold p-2 bg-white rounded-lg tracking-wider shadow-2xl min-w-72`}
        >
            {content}
        </span>
    );
};

interface LabelBoxProps {
    content: string;
    style?: string;
}

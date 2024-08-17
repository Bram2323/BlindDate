import React from "react";

export const LabelBox: React.FC<LabelBoxProps> = ({ content, style }) => {
    return (
        <span
            className={`${style} font-bold p-2 bg-white rounded-lg tracking-wider shadow-2xl border-b-2 border-gray-800 `}
        >
            {content}
        </span>
    );
};

interface LabelBoxProps {
    content: string;
    style?: string;
}

import React from "react";

export const LabelBox: React.FC<LabelBoxProps> = ({ content, style }) => {
    return (
        <span
            className={`${style} font-bold border-2 border-white p-2 bg-white rounded-lg tracking-wider shadow-lg`}
        >
            {content}
        </span>
    );
};

interface LabelBoxProps {
    content: string;
    style: string;
}

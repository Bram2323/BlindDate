import React from "react";

export const LabelBox: React.FC<LabelBoxProps> = ({ content, style }) => {
    return (
        <span
            className={`${style} text-center font-bold p-2 bg-white rounded-lg tracking-wider shadow-2xl border-2 border-gray-600`}
            className={`${style} text-center font-bold p-2 bg-white rounded-lg tracking-wider shadow-2xl border-2 border-gray-600`}
        >
            {content}
        </span>
    );
};

interface LabelBoxProps {
    content: string;
    style?: string;
}

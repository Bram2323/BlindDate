import React from "react";

export const Section: React.FC<SectionProps> = ({
    children,
    label,
    style: style,
}) => {
    return (
        <div
            className={`${style} my-4 p-4 rounded-lg flex flex-col items-center justify-center w-1/2 shadow-lg border-2 border-gray-800`}
        >
            {children}
        </div>
    );
};

interface SectionProps {
    children: React.ReactNode;
    label: string;
    style?: string;
}

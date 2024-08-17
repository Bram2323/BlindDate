import React from "react";

export const Section: React.FC<SectionProps> = ({
    children,
    label,
    style: style,
}) => {
    const breakpoints = "sm:w-2/3 lg:w-2/4";
    return (
        <div
            className={`${style} ${breakpoints} w-full my-4 px-4 py-8 rounded-lg flex flex-col items-center justify-center shadow-lg border-2 border-gray-800`}
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

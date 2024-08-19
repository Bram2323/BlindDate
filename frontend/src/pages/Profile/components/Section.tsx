import React from "react";

export const Section: React.FC<SectionProps> = ({ children, label }) => {
    return (
        <div className="my-4 p-4 rounded-lg flex flex-col items-center justify-center w-1/2 bg-feminine-primary shadow-lg">
            {children}
        </div>
    );
};

interface SectionProps {
    children: React.ReactNode;
    label: string;
}

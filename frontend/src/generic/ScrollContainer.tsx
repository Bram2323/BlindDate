import React from "react";

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
    children,
    label,
}: any) => {
    return (
        <div className="w-full p-4 ">
            {label && (
                <h3 className="font-extrabold tracking-wider m-4 text-center">
                    {label}
                </h3>
            )}
            <div className="border-2 bg-white border-feminine-secondary-dark overflow-scroll h-36 w-full m-2 rounded-lg">
                {children}
            </div>
        </div>
    );
};

interface ScrollContainerProps {
    label?: string;
    children: any;
}

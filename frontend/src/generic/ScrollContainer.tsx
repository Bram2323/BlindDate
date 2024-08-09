import React from "react";

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
    children,
    label,
}: any) => {
    return (
        <>
            {label && <h3>{label}</h3>}
            <div className="border-2 overflow-scroll h-20 w-72 m-2">
                {" "}
                {children}
            </div>
        </>
    );
};

interface ScrollContainerProps {
    label?: string;
    children: any;
}

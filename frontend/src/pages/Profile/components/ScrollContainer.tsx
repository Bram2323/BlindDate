import React from "react";

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
    children,
    label,
    height,
    width,
    headerStyle,
}: any) => {
    return (
        <div className="w-full p-4 flex flex-col items-center justify-center">
            {label && (
                <h3 className={`${headerStyle} tracking-wider text-center`}>
                    {label}
                </h3>
            )}
            <div
                className={`${height ? height : "h-36"} ${
                    width ? width : "w-full"
                } border-2 bg-white border-gray-800 overflow-hidden rounded-lg`}
            >
                <div className={`w-full h-full overflow-auto p-1`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface ScrollContainerProps {
    headerStyle?: string;
    label?: string;
    children: any;
    height?: string;
    width?: string;
}

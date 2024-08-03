import React from "react";

export const ScrollContainer = ({ children }: any) => {
    return (
        <div className="border-2 overflow-scroll h-20 w-56 m-2">
            {" "}
            {children}
        </div>
    );
};

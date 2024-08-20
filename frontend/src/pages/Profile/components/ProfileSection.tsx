import React from "react";

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    items,
    style,
}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center rounded-lg m-4 p-4">
            <h2 className="font-extrabold text-2xl m-4 tracking-wider">
                {title}
            </h2>
            <ul className="w-full flex flex-col items-center justify-center">
                {items.map((item: any) => (
                    <li
                        key={item.id}
                        className={`${style} w-full text-center bg-white rounded-lg shadow-lg p-4 m-4 hover:font-bold`}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface ProfileSectionProps {
    title: string;
    items: any;
    style?: string;
}

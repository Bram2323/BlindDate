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
                {items.map((item: Item) => (
                    <li
                        key={item.id}
                        className={`${style} w-full text-center bg-white border-feminine-secondary-dark rounded-lg shadow-lg p-4 m-4`}
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
    items: Item[];
    style?: string;
}

interface Item {
    id: number;
    name: string;
}

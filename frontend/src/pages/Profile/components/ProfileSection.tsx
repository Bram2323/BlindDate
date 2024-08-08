import React from "react";

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    items,
    style,
}) => {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {items.map((item: Item) => (
                    <li key={item.id} className={`${style} `}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </>
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

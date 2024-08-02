import React from "react";
export const DropDownSelect: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    onSelect,
}) => {
    return (
        <div className="m-2">
            <label htmlFor={label}>{label}</label>
            <select
                name={category}
                id={category}
                onChange={(e) => {
                    onSelect(e.target.value);
                }}
            >
                <option>Select a {category}</option>
                {options &&
                    options.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.value}
                        </option>
                    ))}
            </select>
        </div>
    );
};

interface DropDownSelectProps {
    category: string;
    label?: string;
    options: Option[];
    onSelect: (value: string) => void;
}

interface Option {
    id: number;
    value: string;
}

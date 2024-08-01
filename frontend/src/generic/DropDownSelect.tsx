import React from "react";
export const DropDownSelect: React.FC<DropDownSelectProps> = ({
    label,
    options,
    onSelect,
}) => {
    return (
        <div className="m-2">
            <select
                name={label}
                id={label}
                onChange={(e) => {
                    onSelect(e.target.value);
                }}
            >
                <option>Select a {label}</option>
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
    label: string;
    options: Option[];
    onSelect: (value: string) => void;
}

interface Option {
    id: number;
    value: string;
}

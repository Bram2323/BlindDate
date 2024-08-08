import React, { useEffect, useState } from "react";
export const DropDownSelect: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    onSelect,
    initialValue,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        initialValue
    );
    const [providedOptions, setProvidedOptions] = useState<Option[]>(options);
    useEffect(() => {
        if (initialValue) {
            setSelectedValue(initialValue);
            setProvidedOptions(
                options.filter((option) => option.value != initialValue)
            );
        } else {
            setProvidedOptions(options);
        }
    }, [initialValue, options]);

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
                {initialValue ? (
                    <option>{selectedValue}</option>
                ) : (
                    <option>Select a {category}</option>
                )}
                {providedOptions &&
                    providedOptions.map((option) => (
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
    initialValue?: string;
    onSelect: (value: string) => void;
}

interface Option {
    id: number;
    value: string;
}

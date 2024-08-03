import React from "react";
import { useState } from "react";
import { TbHttpDelete } from "react-icons/tb";

export const DropDownSelectWithList: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    onSelect,
}) => {
    const [showOptions, setShowOptions] = useState<Option[]>(options);
    const [selected, setSelected] = useState<Option[]>();
    console.log(options);

    const handleSelectChange = (e) => {
        // als er 1 word geselecteerd, voeg toe aan selected
        let newOps = showOptions.filter(
            (option) => option.value != e.target.value
        );
        console.log("new", newOps);
        console.log(e.target.value, e.target.id);
        // filter de options lijst en haal de selected eruit.
        // return een lijst met selected
        onSelect(e.target.value);
    };

    return (
        <div className="m-2">
            <label htmlFor={label}>{label}</label>
            <select
                name={category}
                id={category}
                onChange={(e) => {
                    handleSelectChange(e);
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
            <div>
                <ul>
                    {selected &&
                        selected.map((option) => (
                            <li>
                                <p>{option.value}</p>
                                <TbHttpDelete />
                            </li>
                        ))}
                </ul>
            </div>
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

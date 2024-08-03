import React, { useEffect } from "react";
import { useState } from "react";
import { TbHttpDelete } from "react-icons/tb";

export const DropDownSelectWithList: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    getSelected,
}) => {
    const [showOptions, setShowOptions] = useState<Option[]>(options);
    const [selected, setSelected] = useState<Option[]>([]);

    useEffect(() => {
        getSelected(selected);
    }, [showOptions, selected]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value.includes("Select a ")) {
            return;
        }
        const selectedOption = options.find(
            (option) => option.value === e.target.value
        );
        setSelected((prev) => [...prev, selectedOption]);
        setShowOptions(
            (prev) =>
                (prev = prev.filter((option) => option.value != e.target.value))
        );
    };

    const handleDelete = (option: Option) => {
        setSelected(
            (prev) => (prev = prev.filter((item) => item.value != option.value))
        );
        setShowOptions((prev) => [...prev, option]);
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
                {showOptions &&
                    showOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.value}
                        </option>
                    ))}
            </select>
            <div>
                <ul className="border-2 max-h-24 overflow-scroll">
                    {selected &&
                        selected.map((option) => (
                            <li
                                className={
                                    "flex flex-row justify-between border-2 px-2"
                                }
                                key={option.id}
                            >
                                <p>{option.value}</p>
                                <TbHttpDelete
                                    onClick={() => {
                                        handleDelete(option);
                                    }}
                                    className={
                                        "text-red-900 cursor-pointer text-2xl"
                                    }
                                />
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
    getSelected: (selected: Option[]) => void;
}

interface Option {
    id: number;
    value: string;
}

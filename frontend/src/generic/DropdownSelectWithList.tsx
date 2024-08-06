import React, { useEffect, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";

export const DropDownSelectWithList: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    extraOptions,
    getSelected,
}) => {
    const [showOptions, setShowOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<SelectedOption[]>([]);

    useEffect(() => {
        getSelected(selected);
        setShowOptions(options);
    }, [selected]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue.includes("Select a ")) {
            return;
        }
        const selectedOption = options.find(
            (option) => option.value === selectedValue
        );
        if (selectedOption) {
            setSelected((prev) => [...prev, { ...selectedOption, extra: "" }]);
            setShowOptions((prev) =>
                prev.filter((option) => option.value !== selectedValue)
            );
        }
    };

    const handleExtraChange = (optionId: number, extraValue: string) => {
        setSelected((prev) =>
            prev.map((item) =>
                item.id === optionId ? { ...item, extra: extraValue } : item
            )
        );
    };

    const handleDelete = (option: Option) => {
        setSelected((prev) => prev.filter((item) => item.id !== option.id));
        setShowOptions((prev) => [...prev, option]);
    };

    return (
        <div className="m-2">
            <label htmlFor={label}>{label}</label>
            <select name={category} id={category} onChange={handleSelectChange}>
                <option>Select a {category}</option>
                {showOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
            <div>
                <ul className="border-2 max-h-24 overflow-scroll">
                    {selected.map((option) => (
                        <li
                            className="flex flex-row justify-between border-2 px-2"
                            key={option.id}
                        >
                            <p>{option.value}</p>
                            <div className={extraOptions ? "flex " : ""}>
                                {extraOptions &&
                                    extraOptions.map((extra) => (
                                        <div
                                            key={option.id + extra}
                                            className="flex flex-col border-2"
                                        >
                                            <label
                                                htmlFor={`${option.id}-${extra}`}
                                            >
                                                {extra}
                                            </label>
                                            <input
                                                type="radio"
                                                name={`radio-${option.id}`}
                                                id={`${option.id}-${extra}`}
                                                value={extra}
                                                checked={option.extra === extra}
                                                onChange={(e) => {
                                                    handleExtraChange(
                                                        option.id,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                    ))}
                                <TbHttpDelete
                                    onClick={() => handleDelete(option)}
                                    className="text-red-900 cursor-pointer text-2xl"
                                />
                            </div>
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
    extraOptions?: string[];
    getSelected: (selected: SelectedOption[]) => void;
}

interface Option {
    id: number;
    value: string;
}

interface SelectedOption extends Option {
    extra: string;
}

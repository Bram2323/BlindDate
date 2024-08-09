import React, { useEffect, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { DropDownSelect } from "./DropDownSelect";

export const DropDownSelectWithList: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    extraOptions,
    initialValues,
    getSelected,
}) => {
    const [showOptions, setShowOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<SelectedOption[]>([]);

    useEffect(() => {
        getSelected(selected);
        setShowOptions(options);
        if (initialValues) {
            setSelected(initialValues);
        }
        console.log("initial ", initialValues);
        console.log("selected ", selected);
        console.log("extraOptions ", extraOptions);
    }, [selected]);

    return (
        <div className="m-2">
            <div>
                {label && <label htmlFor={label}>{label}</label>}
                <select name={label} id={label}>
                    {showOptions.map((option) => (
                        <option key={option.id}>{option.value}</option>
                    ))}
                </select>
            </div>
            <ul>
                {selected &&
                    selected.map((selection) => (
                        <li
                            className="flex flex-row items-center border-2"
                            key={selection.id}
                        >
                            <span>{selection.value}</span>
                            {extraOptions && (
                                <DropDownSelect
                                    category={""}
                                    options={extraOptions.map((option, i) => ({
                                        id: i,
                                        value: option,
                                    }))}
                                    onSelect={(value) => {
                                        console.log(value);
                                    }}
                                    initialValue={
                                        selection.extra
                                            ? selection.extra
                                                  .toLowerCase()
                                                  .replace("_", " ")
                                            : undefined
                                    }
                                />
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

interface DropDownSelectProps {
    category: string;
    label?: string;
    options: Option[];
    extraOptions?: string[];
    initialValues?: Option[] | SelectedOption[];
    getSelected: (selected: SelectedOption[]) => void;
}

interface Option {
    id: number;
    value: string;
}

interface SelectedOption extends Option {
    extra: string;
}

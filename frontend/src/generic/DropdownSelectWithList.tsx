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
        setShowOptions(options);
        if (initialValues) {
            const initialSelected = initialValues as SelectedOption[];
            setSelected(initialSelected);
            deleteInitFromShow(initialSelected);
        }
    }, [options, initialValues]);

    const deleteInitFromShow = (initialSelected: SelectedOption[]) => {
        const selectedValues = new Set(
            initialSelected.map((option) => option.value)
        );

        const filteredShowOptions = showOptions.filter(
            (option) => !selectedValues.has(option.value)
        );
        setShowOptions(filteredShowOptions);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue.includes("Select")) {
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
            //TODO sorteer de opties
        }
    };

    const handleExtraChange = (newValue, id) => {
        console.log("Extra: ", newValue, "ID: ", id);

        const updatedSelected = selected.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    extra: newValue,
                };
            }
            return item;
        });
        console.log("Updated Selected: ", updatedSelected);
        setSelected(updatedSelected);
    };

    const handleDelete = (option: Option) => {
        setSelected((prev) => prev.filter((item) => item.id !== option.id));
        setShowOptions((prev) => [...prev, option]);
    };

    useEffect(() => {
        getSelected(selected);
    }, [handleDelete, handleExtraChange]);

    return (
        <div className="m-2">
            <div>
                {label && <label htmlFor={label}>{label}</label>}
                <select
                    name={label}
                    id={label}
                    onChange={(e) => {
                        handleSelectChange(e);
                    }}
                >
                    {showOptions.map((option) => (
                        <option
                            key={option.id + option.value}
                            value={option.value}
                        >
                            {option.value}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="overflow-scroll h-24">
                {selected &&
                    selected.map((selection) => (
                        <li
                            className="flex flex-row items-center border-2"
                            key={selection.id + selection.value}
                        >
                            <span>{selection.value}</span>
                            {extraOptions && (
                                <DropDownSelect
                                    category={"choice"}
                                    id={selection.id + selection.value}
                                    options={extraOptions.map((option, i) => ({
                                        id: i,
                                        value: option,
                                    }))}
                                    onSelect={(value, id) => {
                                        handleExtraChange(value, id);
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
                            <TbHttpDelete
                                onClick={() => handleDelete(selection)}
                                className="text-red-900 cursor-pointer text-2xl"
                            />
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

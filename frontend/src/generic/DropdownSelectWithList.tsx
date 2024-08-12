import React, { useEffect, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { DropDownSelect } from "./DropDownSelect";
import { ScrollContainer } from "./ScrollContainer";

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
            setSelected((prev) => [{ ...selectedOption, extra: "" }, ...prev]);
            setShowOptions((prev) =>
                prev.filter((option) => option.value !== selectedValue)
            );
        }
    };

    const handleExtraChange = (newValue: string, id: number | undefined) => {
        const updatedSelected = selected.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    extra: newValue.toUpperCase(),
                };
            }
            return item;
        });
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
        <div className="m-2 w-full p-4 flex flex-col items-center justify-center">
            <div className="w-full">
                {label && <label htmlFor={label}>{label}</label>}
                <select
                    className="bg-white px-2 py-1 rounded-lg border-feminine-secondary-dark border-2 m-2"
                    name={label}
                    id={label}
                    onChange={(e) => {
                        handleSelectChange(e);
                    }}
                >
                    <option className="bg-white">Select a {category}</option>

                    {showOptions.map((option) => (
                        <option
                            key={option.id + option.value}
                            value={option.value}
                            className="bg-white"
                        >
                            {option.value.toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            <ScrollContainer>
                <ul className="bg-white w-full rounded-lg flex flex-col items-center justify-center">
                    {selected &&
                        selected.map((selection) => (
                            <li
                                className="flex flex-row items-center justify-between px-2 w-full"
                                key={selection.id + selection.value}
                            >
                                <div>{selection.value}</div>
                                <div>
                                    {extraOptions && (
                                        <DropDownSelect
                                            category={"choice"}
                                            id={selection.id}
                                            options={extraOptions.map(
                                                (option, i) => ({
                                                    id: i,
                                                    value: option,
                                                })
                                            )}
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
                                </div>
                                <div>
                                    <TbHttpDelete
                                        onClick={() => handleDelete(selection)}
                                        className="text-red-900 cursor-pointer text-3xl"
                                    />
                                </div>
                            </li>
                        ))}
                </ul>
            </ScrollContainer>
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

import React, { useEffect, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { DropDownSelect } from "./DropDownSelect";
import { ScrollContainer } from "./ScrollContainer";

export const EnhancedDropdown: React.FC<DropDownSelectProps> = ({
    label,
    category,
    options,
    extraOptions,
    initialValues,
    getSelected,
}) => {
    const [showOptions, setShowOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<SelectedOption[]>([]);
    const layoutIfExtra = extraOptions
        ? "flex-col border-t-2 border-gray-200"
        : "flex-col border-t-2 border-gray-200";

    useEffect(() => {
        setShowOptions(sortOptions(options));
        if (initialValues) {
            const initialSelected = initialValues as SelectedOption[];
            setSelected(initialSelected);
            deleteInitFromShow(initialSelected);
        }
    }, [options, initialValues]);

    const deleteInitFromShow = (initialSelected: SelectedOption[]) => {
        const selectedValues = initialSelected.map((option) => option.value);
        const filteredShowOptions = showOptions.filter(
            (option) => !selectedValues.includes(option.value)
        );
        setShowOptions(sortOptions(filteredShowOptions));
    };

    const sortOptions = (list: Option[]) => {
        return list.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        });
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

    const handleExtraChange = (
        newValue: string,
        id: number | undefined | string
    ) => {
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
        setShowOptions((prev) => sortOptions([...prev, option]));
    };

    useEffect(() => {
        getSelected(selected);
    }, [handleDelete, handleExtraChange]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full">
                {label && <label htmlFor={label}>{label}</label>}
                <select
                    className="bg-white px-2 py-1 rounded-lg border-gray-800 border-2 my-2 w-full"
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
            <ScrollContainer width={"w-full"}>
                <ul className="bg-white w-full rounded-lg flex flex-col items-center justify-center">
                    {selected &&
                        selected.map((selection, index) => (
                            <li
                                className={`${
                                    index != 0 && layoutIfExtra
                                } w-full grid grid-cols-8`}
                                key={selection.id + selection.value}
                            >
                                <div className="text-sm col-span-4">
                                    {selection.value}
                                </div>
                                <div className="col-span-3">
                                    {extraOptions && (
                                        <DropDownSelect
                                            category={""}
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
                                <div className="col-span-1">
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
    getSelected: (value: SelectedOption[], id?: string | number) => void;
}

interface Option {
    id: number;
    value: string;
}

interface SelectedOption extends Option {
    extra: string;
}

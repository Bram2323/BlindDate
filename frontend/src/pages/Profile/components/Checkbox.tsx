import React, { useEffect } from "react";
import { useState } from "react";

const Checkbox: React.FC<CheckboxProps> = ({
    targetId,
    content,
    isChecked,
    handleChange,
}) => {
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (isChecked) {
            setChecked(isChecked);
        }
    }, [isChecked]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        handleChange(targetId, e.target.checked);
    };

    return (
        <div className="flex items-center m-2">
            <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="checkbox"
                id={content}
                name={content}
                value={content}
                className={`before:content[''] before:bg-blue-gray-500 checked:primary peer relative mr-2 h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity after:absolute after:left-0 after:top-0 after:flex after:h-full after:w-full after:items-center after:justify-center checked:after:text-white checked:after:content-['🤩'] hover:before:opacity-10`}
                checked={checked}
            />
            <label htmlFor={content}>{content}</label>
        </div>
    );
};

export default Checkbox;

interface CheckboxProps {
    targetId: number;
    content: string;
    isChecked?: boolean;
    handleChange: (targetId: number, isChecked: boolean) => void;
}

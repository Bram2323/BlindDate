import { useEffect, useState } from "react";
export const TextArea: React.FC<TextArea> = ({
    handleChange,
    label,
    initialValue,
}) => {
    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue]);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        handleChange(newValue);
    };

    return (
        <div className="flex flex-col m-2 w-full">
            <label htmlFor={label}>{label}</label>
            <textarea
                className="resize-none border-2 m-4 min-h-36 p-4 rounded-lg border-gray-800"
                onChange={(e) => {
                    handleValueChange(e.target.value);
                }}
                value={value}
            />
        </div>
    );
};

interface TextArea {
    label?: string;
    content?: string;
    initialValue?: string;
    handleChange: (text: string) => void;
}

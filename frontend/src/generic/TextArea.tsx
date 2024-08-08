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
        <div className="flex flex-col m-2">
            <label htmlFor={label}>{label}</label>
            <textarea
                className="resize-none border-2"
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

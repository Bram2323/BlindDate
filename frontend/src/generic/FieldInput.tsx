import {useState} from "react";

/*

*/
const FieldInput: React.FC<FieldInputProps> = ({
    label,
    content,
    type,
    layout,
    style,
    handleChange,
}) => {
    const [value, setValue] = useState<string | number>(content ? content : "");

    return (
        <div className={`${layout} border-2 p-2`} data-value={value}>
            {label && (
                <label htmlFor="label" className={`${style}`}>
                    {label}
                </label>
            )}
            <input
                onChange={(e) => {
                    setValue(e.target.value);
                    handleChange(e.target.value);
                }}
                className={`${style} border-2 p-2`}
                name={label}
                type={type ? type : "text"}
                value={value}
            />
        </div>
    );
};

export default FieldInput;

interface FieldInputProps {
    label?: string;
    type?: string;
    content?: string | number;
    layout?: string;
    style?: string;
    handleChange: (e: string) => void;
}

/**
 * FieldInput is a React component that displays an input field with an optional label
 * Optional @Param label <string> represents the label that is given to the input field
 * Optional @Param type<string> represents the type of input field
 * Optional @Param content<string | number> represents the initial value of the input field.
 * Optional @Param layout<string> represents the styling of the outer div, to be used for layout styling purposes
 * Optional @Param style<string> represents the styling of the input field as well as the label, styling purposes.
 * @Param handleChange - function that handles the change of the input field and returns its value to its parent.
 */

import {useState} from "react";

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
 * FieldInput is a React component that displays an input field with an optional label.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.label] - Optional. The label text for the input field.
 * @param {string} [props.type] - Optional. The type of the input field. Defaults to "text".
 * @param {string | number} [props.content] - Optional. The initial value of the input field.
 * @param {string} [props.layout] - Optional. The CSS class names for layout styling of the outer div.
 * @param {string} [props.style] - Optional. The CSS class names for styling the input field and label.
 * @param {(value: string) => void} props.handleChange - The function to handle changes in the input field.
 *
 * @returns {JSX.Element} The FieldInput component.
 */

const FieldInput: React.FC<FieldInputProps> = ({
    label,
    content,
    type,
    layout,
    style,
    handleChange,
    onSubmit,
    onBlur,
}) => {
    return (
        <div className={`${layout} border-2 `} data-value={content}>
            {label && (
                <label htmlFor="label" className={`${style} font-bold`}>
                    {label}
                </label>
            )}
            <input
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key == "Enter" && onSubmit) onSubmit();
                }}
                onBlur={() => {
                    if (onBlur) onBlur();
                }}
                className={`${style} border-2 p-2`}
                name={label}
                type={type ? type : "text"}
                value={content}
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
    onSubmit?: () => void;
    onBlur?: () => void;
}

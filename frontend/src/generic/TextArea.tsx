export const TextArea: React.FC<TextArea> = ({
    handleChange,
    label,
    content,
}) => {
    return (
        <div className="flex flex-col m-2">
            <label htmlFor={label}>{label}</label>
            <textarea
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                placeholder={content}
            />
        </div>
    );
};

interface TextArea {
    label?: string;
    content?: string;
    handleChange: (text: string) => void;
}

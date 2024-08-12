import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export const DateInput: React.FC<DateInputProps> = ({
    label,
    initialDate = "",
    getDate,
    style,
}) => {
    const [date, setDate] = useState<string>(initialDate);

    useEffect(() => {
        if (initialDate !== undefined && initialDate !== null) {
            setDate(initialDate);
        }
    }, [initialDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDate(newDate);
        const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
        getDate(formattedDate);
    };

    return (
        <div
            className={`${style} flex flex-col items-center justify-center p-2`}
        >
            <label>{label}</label>
            <input
                className={
                    "border-2 border-feminine-secondary-dark rounded-lg m-2 px-2 py-1"
                }
                type="date"
                value={date || ""}
                onChange={handleChange}
            />
        </div>
    );
};

interface DateInputProps {
    label?: string;
    initialDate?: string;
    getDate: (date: string) => void;
    style?: string;
}

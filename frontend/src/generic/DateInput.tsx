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

    const handleChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
        getDate(formattedDate);
    };

    return (
        <div className={`${style} `}>
            <label>{label}</label>
            <input type="date" value={date || ""} onChange={handleChange} />
        </div>
    );
};

interface DateInputProps {
    label?: string;
    initialDate?: string;
    getDate: (date: string) => void;
    style?: string;
}

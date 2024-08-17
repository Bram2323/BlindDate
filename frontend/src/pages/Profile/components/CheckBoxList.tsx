import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { IFetchOption } from "./ProfileInterfaces";

export const CheckBoxList: React.FC<CheckBoxListProps> = ({
    options,
    initialValues,
    getIdList,
}) => {
    const [checkedList, setCheckedList] = useState<number[]>([]);

    useEffect(() => {
        if (initialValues) {
            setCheckedList(initialValues.map((value: any) => value.id));
        }
    }, []);

    useEffect(() => {
        getIdList(checkedList);
    }, [checkedList]);

    const handleCheckboxChange = (providedId: number, isChecked: boolean) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, providedId]);
        } else {
            setCheckedList((prev) => {
                return prev.filter((id) => id != providedId);
            });
        }
    };
    return (
        <ul>
            {options &&
                options.map((option: any) => (
                    <li key={option.id}>
                        <Checkbox
                            targetId={option.id}
                            content={option.name}
                            handleChange={(id, isChecked) =>
                                handleCheckboxChange(id, isChecked)
                            }
                            isChecked={initialValues?.some(
                                (p: any) => p.id === option.id
                            )}
                        />
                    </li>
                ))}
        </ul>
    );
};

interface CheckBoxListProps {
    options: IFetchOption[] | undefined;
    initialValues?: IFetchOption[];
    getIdList: (list: number[]) => void;
}

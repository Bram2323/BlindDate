import { useEffect, useRef, useState } from "react";
import Checkbox from "../../generic/Checkbox";
import { TextArea } from "../../generic/TextArea";
import { DropDownSelect } from "../../generic/DropDownSelect";
import FieldInput from "../../generic/FieldInput";
import ApiService from "../../services/ApiService";
import { Button } from "../../generic/Button";
import validateForm from "../../hooks/useProfileFormValidator";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../generic/ImageUpload";

export const CreateProfile = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    const showError = (message: string) => {
        setTimeout(() => {
            setError("");
        }, 3000);
        setError(message);
    };

    const genders = [
        { id: 1, value: "male" },
        { id: 2, value: "female" },
        { id: 3, value: "non-binary" },
        { id: 4, value: "other" },
    ];

    const [sexualities, setSexualities] = useState<Sexuality[]>();

    const formRef = useRef<ProfileForm>({
        description: "",
        gender: "",
        lookingForGender: "",
        sexualities: [],
        dateOfBirth: "",
    });

    useEffect(() => {
        ApiService.get("sexualities")
            .then((response) => {
                setSexualities(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const saveProfile = () => {
        if (validateForm(formRef.current)) {
            ApiService.post("profiles", formRef.current)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    showError(error.response.data.detail);
                });
        } else {
            showError("Fill in all fields");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center border-2 w-96">
            <div className={"h-8 p-2 text-red-600"}>{error}</div>
            <ImageUpload />
            <TextArea
                label={"description"}
                content={"Write something about yourself"}
                handleChange={(description) => {
                    formRef.current.description = description;
                }}
            />
            <DropDownSelect
                label={"I am a"}
                category={"Gender"}
                options={genders}
                onSelect={(gender) => {
                    formRef.current.gender = gender;
                }}
            />
            <DropDownSelect
                label={"I am looking for a "}
                category={"Gender"}
                options={genders}
                onSelect={(gender) => {
                    formRef.current.lookingForGender = gender;
                }}
            />
            <div className="border-2 overflow-scroll h-20 w-56 m-2">
                {sexualities &&
                    sexualities.map((sexuality) => (
                        <Checkbox
                            key={sexuality.id}
                            content={sexuality.name}
                            targetId={sexuality.id}
                            handleChange={(targetId, isChecked) => {
                                if (isChecked) {
                                    formRef.current.sexualities.push(targetId);
                                } else {
                                    formRef.current.sexualities =
                                        formRef.current.sexualities.filter(
                                            (id) => id !== targetId
                                        );
                                }
                            }}
                        />
                    ))}
            </div>
            <FieldInput
                type={"date"}
                label={"date of birth"}
                handleChange={(value) => {
                    formRef.current.dateOfBirth = value;
                }}
            />
            <Button content={"submit"} handleClick={saveProfile} />
        </div>
    );
};

interface Sexuality {
    id: number;
    name: string;
}

interface ProfileForm {
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: number[];
    dateOfBirth: string;
}

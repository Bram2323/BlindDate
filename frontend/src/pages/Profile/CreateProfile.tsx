import { useEffect, useRef, useState } from "react";
import Checkbox from "../../generic/Checkbox";
import { TextArea } from "../../generic/TextArea";
import { DropDownSelect } from "../../generic/DropDownSelect";
import FieldInput from "../../generic/FieldInput";
import ApiService from "../../services/ApiService";
import { Button } from "../../generic/Button";
import useValidators from "../../services/useValidators";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../generic/ImageUpload";
import { ScrollContainer } from "../../generic/ScrollContainer";
import { DropDownSelectWithList } from "../../generic/DropdownSelectWithList";

export const CreateProfile = () => {
    const { validateForm } = useValidators();
    const navigate = useNavigate();
    const imageRef = useRef<File | null>(null);
    const [error, setError] = useState<string>("");
    const [sexualities, setSexualities] = useState<FetchOption[]>();
    const [interests, setInterests] = useState<FetchOption[]>();

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

    const formRef = useRef<ProfileForm>({
        description: "",
        gender: "",
        lookingForGender: "",
        sexualities: [],
        dateOfBirth: "",
        imageId: null,
        interests: [],
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

    useEffect(() => {
        ApiService.get("interests")
            .then((response) => {
                setInterests(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const saveProfile = () => {
        saveImage().then(() => {
            if (validateForm(formRef.current)) {
                ApiService.post("profiles", formRef.current)
                    .then((response) => {
                        formRef.current.imageId = response.data.id;
                        console.log(
                            "profile posted TODO redirect to profile page"
                        );
                        navigate("/");
                    })
                    .catch((error) => {
                        showError(error.response.data.detail);
                    });
            } else {
                showError("Fill in all fields");
            }
        });
    };

    const saveImage = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            if (imageRef.current) {
                formData.append("image", imageRef.current);
                ApiService.post("images", formData)
                    .then((response) => {
                        formRef.current.imageId = response.data.id;
                        resolve(true);
                    })
                    .catch((error) => {
                        showError("Image not uploaded: " + error);
                        resolve(false);
                    });
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 w-96">
            <div className={"h-8 p-2 text-red-600"}>{error}</div>
            <ImageUpload
                getImage={(image) => {
                    imageRef.current = image;
                }}
            />
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
                    formRef.current.gender = gender.replace("-", "");
                }}
            />
            <DropDownSelect
                label={"I am looking for a "}
                category={"Gender"}
                options={genders}
                onSelect={(gender) => {
                    formRef.current.lookingForGender = gender.replace("-", "");
                }}
            />
            <ScrollContainer label={"Preferences"}>
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
            </ScrollContainer>

            {interests && (
                <DropDownSelectWithList
                    label={"Things i like "}
                    category="interest"
                    options={interests.map((interest) => ({
                        id: interest.id,
                        value: interest.name,
                    }))}
                    getSelected={(interests) => {
                        formRef.current.interests = interests.map(
                            (interest) => interest.id
                        );
                        console.log(formRef.current.interests);
                    }}
                />
            )}

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

interface FetchOption {
    id: number;
    name: string;
}

interface ProfileForm {
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: number[];
    dateOfBirth: string;
    imageId: number | null;
    interests: number[];
}

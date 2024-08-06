import { useEffect, useRef, useState } from "react";
import Checkbox from "../../generic/Checkbox";
import { TextArea } from "../../generic/TextArea";
import { DropDownSelect } from "../../generic/DropDownSelect";
import FieldInput from "../../generic/FieldInput";
import ApiService from "../../services/ApiService";
import { Button } from "../../generic/Button";
import useValidators from "../../hooks/useValidators";
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
    const [traits, setTraits] = useState<FetchTrait[]>();

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 3000);
    };

    const genders = [
        { id: 1, value: "male" },
        { id: 2, value: "female" },
        { id: 3, value: "nonbinary" },
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
        traits: [],
    });

    const fetchData = (url: string, setState: any) => {
        ApiService.get(url)
            .then((response) => setState(response.data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchData("sexualities", setSexualities);
        fetchData("interests", setInterests);
        fetchData("traits", setTraits);
    }, []);

    const saveProfile = () => {
        saveImage().then((imageSaved) => {
            if (imageSaved && validateForm(formRef.current)) {
                ApiService.post("profiles", formRef.current)
                    .then(() => {
                        navigate("/profile");
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
            if (imageRef.current) {
                const formData = new FormData();
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
            } else {
                resolve(true);
            }
        });
    };

    const handleCheckboxChange = (
        list: number[],
        id: number,
        isChecked: boolean
    ) => {
        if (isChecked) {
            list.push(id);
        } else {
            const index = list.indexOf(id);
            if (index > -1) list.splice(index, 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 w-96">
            <div className={"h-8 p-2 text-red-600"}>{error}</div>
            <ImageUpload getImage={(image) => (imageRef.current = image)} />
            <TextArea
                label={"Description"}
                content={"Write something about yourself"}
                handleChange={(description) =>
                    (formRef.current.description = description)
                }
            />
            <DropDownSelect
                label={"I am a"}
                category={"Gender"}
                options={genders}
                onSelect={(gender) =>
                    (formRef.current.gender = gender.replace("-", ""))
                }
            />
            <DropDownSelect
                label={"I am looking for a "}
                category={"Gender"}
                options={genders}
                onSelect={(gender) =>
                    (formRef.current.lookingForGender = gender.replace("-", ""))
                }
            />
            <ScrollContainer label={"Preferences"}>
                {sexualities?.map((sexuality) => (
                    <Checkbox
                        key={sexuality.id}
                        content={sexuality.name}
                        targetId={sexuality.id}
                        handleChange={(id, isChecked) =>
                            handleCheckboxChange(
                                formRef.current.sexualities,
                                id,
                                isChecked
                            )
                        }
                    />
                ))}
            </ScrollContainer>
            {interests && (
                <DropDownSelectWithList
                    label={"Things I like "}
                    category="interest"
                    options={interests.map((interest) => ({
                        id: interest.id,
                        value: interest.name,
                    }))}
                    getSelected={(selectedInterests) => {
                        formRef.current.interests = selectedInterests.map(
                            (interest) => interest.id
                        );
                    }}
                />
            )}
            {traits && (
                <DropDownSelectWithList
                    label={"Traits"}
                    category={"Trait"}
                    options={traits.map((trait) => ({
                        id: trait.id,
                        value: trait.question,
                    }))}
                    extraOptions={["yes", "no", "it depends"]}
                    getSelected={(selectedTraits) => {
                        formRef.current.traits = selectedTraits.map(
                            (trait) => ({
                                id: trait.id,
                                answer: trait.extra.replace(" ", "_"),
                            })
                        );
                    }}
                />
            )}
            <FieldInput
                type={"date"}
                label={"Date of Birth"}
                handleChange={(value) => (formRef.current.dateOfBirth = value)}
            />
            <Button content={"Submit"} handleClick={saveProfile} />
        </div>
    );
};

interface FetchOption {
    id: number;
    name: string;
}
interface FetchTrait {
    id: number;
    question: string;
}
interface ProfileForm {
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: number[];
    dateOfBirth: string;
    imageId: number | null;
    interests: number[];
    traits: Trait[];
}

interface Trait {
    id: number;
    answer: string;
}

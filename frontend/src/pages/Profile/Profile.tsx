import { useEffect, useState } from "react";
import { useUser } from "../../services/UserService";
import ApiService from "../../services/ApiService";
import FieldInput from "../../generic/FieldInput";
import { TextArea } from "../../generic/TextArea";
import { ImageUpload } from "./components/ImageUpload";
import { DropDownSelect } from "../../generic/DropDownSelect";
import { ScrollContainer } from "../../generic/ScrollContainer";
import Checkbox from "../../generic/Checkbox";
import { DropDownSelectWithList } from "../../generic/DropdownSelectWithList";
import { Button } from "../../generic/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useValidators from "../../hooks/useValidators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    IProfile,
    IFetchOption,
    IFetchTrait,
    IProfileForm,
    ITrait,
} from "./ProfileInterfaces";

const genders = [
    { id: 1, value: "male" },
    { id: 2, value: "female" },
    { id: 3, value: "nonbinary" },
    { id: 4, value: "other" },
];

const fetchProfileData = () => {
    return ApiService.get("profiles/my")
        .then((profileResponse) => {
            const profileData = profileResponse.data;
            return ApiService.get(
                `images/${profileData.imageId}`,
                null,
                "blob"
            ).then((imageResponse) => {
                const imageUrl = URL.createObjectURL(imageResponse.data);
                return { profile: profileData, imageUrl };
            });
        })
        .catch((error) => {
            console.log("there is no existing");
            // als deze dan is er dus geen bestaand profiel aanwezig
            return { profile: null, imageUrl: "" };
        });
};

export const Profile = () => {
    const [user, loggedIn] = useUser();
    const navigate = useNavigate();
    const { validateForm } = useValidators();
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [imageSrc, setImageUrl] = useState<string>();
    const [error, setError] = useState<string>("");
    const [sexualities, setSexualities] = useState<IFetchOption[]>();
    const [interests, setInterests] = useState<IFetchOption[]>();
    const [traits, setTraits] = useState<IFetchTrait[]>();
    const imageRef = useRef<File | null>(null);
    const formRef = useRef<IProfileForm>({
        description: "",
        gender: "",
        lookingForGender: "",
        sexualities: [],
        dateOfBirth: "",
        imageId: null,
        interests: [],
        traits: [],
    });

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

    const saveProfile = () => {
        console.log(formRef);
        saveImage().then((imageSaved) => {
            if (imageSaved && validateForm(formRef.current)) {
                ApiService.post("profiles", formRef.current)
                    .then(() => {
                        console.log("saving profile");
                    })
                    .catch((error) => {
                        showError(error.response.data.detail);
                    });
            } else {
                showError("Fill in all fields");
            }
        });
    };

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 3000);
    };

    useEffect(() => {
        fetchData("sexualities", setSexualities);
        fetchData("interests", setInterests);
        fetchData("traits", setTraits);
        fetchProfileData().then((res) => {
            setProfile(res.profile);
            setImageUrl(res.imageUrl);
        });
    }, []);

    const fetchData = (url: string, setState: any) => {
        ApiService.get(url)
            .then((response) => {
                setState(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
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
        <div className="p-6">
            <h1 className="text-5xl capitalize">{user.username}</h1>
            <span className="text-red-700 text-5xl absolute left-1/2">
                {/* todo maak een pop up for dit */}
                {error}
            </span>
            <div>
                <ImageUpload
                    style={"h-72"}
                    initialValue={imageSrc ? imageSrc : ""}
                    getImage={(image) => (imageRef.current = image)}
                />

                <TextArea
                    initialValue={
                        profile?.description ? profile.description : ""
                    }
                    handleChange={(description) =>
                        (formRef.current.description = description)
                    }
                />

                <DropDownSelect
                    label={"Gender"}
                    category={"gender"}
                    options={genders}
                    onSelect={(gender) =>
                        (formRef.current.gender = gender.replace("-", ""))
                    }
                    initialValue={
                        profile?.gender
                            ? profile.gender.toLowerCase().replace("_", " ")
                            : ""
                    }
                />

                <DropDownSelect
                    label={"Gender"}
                    category={"gender"}
                    options={genders}
                    onSelect={(gender) =>
                        (formRef.current.lookingForGender = gender.replace(
                            "-",
                            ""
                        ))
                    }
                    initialValue={
                        profile?.lookingForGender
                            ? profile.lookingForGender
                                  .toLowerCase()
                                  .replace("_", " ")
                            : ""
                    }
                />

                <ScrollContainer label={"Preferences"}>
                    <ul>
                        {sexualities &&
                            sexualities.map((sex) => (
                                <li key={sex.id}>
                                    <Checkbox
                                        targetId={sex.id}
                                        content={sex.name}
                                        handleChange={(id, isChecked) =>
                                            handleCheckboxChange(
                                                formRef.current.sexualities,
                                                id,
                                                isChecked
                                            )
                                        }
                                        isChecked={profile?.sexualities.some(
                                            (s: IFetchOption) => s.id === sex.id
                                        )}
                                    />
                                </li>
                            ))}
                    </ul>
                </ScrollContainer>

                {traits && (
                    <DropDownSelectWithList
                        label={"Traits"}
                        category={"Trait"}
                        options={traits.map((trait) => ({
                            id: trait.id,
                            value: trait.question,
                        }))}
                        extraOptions={["yes", "no", "it depends"]}
                        initialValues={profile?.traits.map((trait) => ({
                            id: trait.id,
                            value: trait.trait.question,
                            extra: trait.answer,
                        }))}
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

                {interests && (
                    <DropDownSelectWithList
                        label={"Things I like "}
                        category="interest"
                        options={interests.map((interest) => ({
                            id: interest.id,
                            value: interest.name,
                        }))}
                        initialValues={profile?.interests.map((interest) => ({
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
                <div>
                    <label>Date of Birth</label>
                    <DatePicker
                        selected={new Date()}
                        onChange={(date) =>
                            (formRef.current.dateOfBirth = date
                                ? date.toLocaleDateString("nl-NL", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                  })
                                : "")
                        }
                        dateFormat={"dd-MM-yyyy"}
                        className="border-2"
                    />
                </div>
                <Button content={"Submit"} handleClick={saveProfile} />
            </div>
        </div>
    );
};

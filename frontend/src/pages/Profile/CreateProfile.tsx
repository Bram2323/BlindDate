import { useEffect, useState } from "react";
import { useUser } from "../../services/UserService";
import ApiService from "../../services/ApiService";
import { TextArea } from "../../generic/TextArea";
import { ImageUpload } from "../../generic/ImageUpload";
import { DropDownSelect } from "../../generic/DropDownSelect";
import { ScrollContainer } from "../../generic/ScrollContainer";
import Checkbox from "../../generic/Checkbox";
import { DropDownSelectWithList } from "../../generic/DropdownSelectWithList";
import { Button } from "../../generic/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useValidators from "../../hooks/useValidators";
import "react-datepicker/dist/react-datepicker.css";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import {
    IProfile,
    IFetchOption,
    IFetchTrait,
    IProfileForm,
} from "./ProfileInterfaces";
import { DateInput } from "../../generic/DateInput";
import { Warning } from "../../generic/Warning";
import { Section } from "./components/Section";
export const CreateProfile = () => {
    const [profileExists, setProfileExists] = useState<boolean>(false);
    const [user, loggedIn] = useUser();
    const navigate = useNavigate();
    const { validateForm } = useValidators();
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [imageSrc, setImageUrl] = useState<string>();
    const [error, setError] = useState<string>("");
    const [sexualities, setSexualities] = useState<IFetchOption[]>();
    const [preferences, setPreferences] = useState<IFetchOption[]>();
    const [interests, setInterests] = useState<IFetchOption[]>();
    const [traits, setTraits] = useState<IFetchTrait[]>();
    const imageRef = useRef<File | null>(null);
    const formRef = useRef<IProfileForm>({
        description: "",
        gender: "",
        lookingForGender: [],
        sexualities: [],
        preferences: [],
        dateOfBirth: "",
        imageId: null,
        interests: [],
        traits: [],
        minAge: 0,
        maxAge: 99,
    });
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
                    setProfileExists(true);
                    return { profile: profileData, imageUrl };
                });
            })
            .catch((error) => {
                return { profile: null, imageUrl: "" };
            });
    };

    const saveImage = () => {
        return new Promise((resolve) => {
            if (!imageRef.current) {
                resolve(true);
                return;
            }
            const formData = new FormData();
            formData.append("image", imageRef.current);

            ApiService.post("images", formData)
                .then((response) => {
                    formRef.current.imageId = response.data.id;
                    resolve(true);
                })
                .catch((error) => {
                    setError("Image not uploaded: " + error);
                    resolve(false);
                });
        });
    };

    const saveProfile = () => {
        if (!profileExists && !validateForm(formRef.current)) {
            setError("Fill in all fields");
            return;
        }
        if (formRef.current.lookingForGender.length === 0) {
            setError("Select at least 1 gender you are looking for!");
            return;
        }
        saveImage().then((imageSaved) => {
            if (imageSaved) {
                const apiCall = profileExists
                    ? ApiService.patch(
                          `profiles/${Number(profile?.id)}`,
                          formRef.current
                      )
                    : ApiService.post("profiles", formRef.current);

                apiCall
                    .then((response) => {
                        navigate(`/profile`);
                    })
                    .catch((error) => {
                        setError(error.response.data.detail);
                    });
            }
        });
    };

    useEffect(() => {
        if (profile != null) {
            formRef.current = profile;
            formRef.current.sexualities = formRef.current.sexualities.map(
                (sex) => sex.id
            );
            formRef.current.interests = formRef.current.interests.map(
                (interest) => interest.id
            );
            formRef.current.preferences = formRef.current.preferences.map(
                (pref) => pref.id
            );
        }
    }, [profileExists]);

    useEffect(() => {
        fetchData("sexualities", setSexualities);
        fetchData("interests", setInterests);
        fetchData("traits", setTraits);
        fetchData("preferences", setPreferences);
    }, []);

    useEffect(() => {
        fetchProfileData().then((res) => {
            setProfile(res.profile);
            setImageUrl(res.imageUrl);
        });
    }, [traits, sexualities, interests, preferences]);

    const fetchData = (url: string, setState: any) => {
        ApiService.get(url)
            .then((response) => {
                setState(response.data);
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

    const handleGenderChange = (
        list: String[],
        id: number,
        isChecked: boolean
    ) => {
        const gender = genders
            .find((gender) => gender.id === id)
            ?.value.toUpperCase();

        if (isChecked && gender) {
            if (!list.includes(gender)) {
                list.push(gender);
            }
        } else if (gender) {
            const index = list.indexOf(gender);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Warning
                message={error}
                duration={3000}
                warningColor={"bg-red-500"}
            />
            <Section label={"img-container"}>
                <h1 className="text-5xl font-extrabold tracking-wider capitalize m-2 sm:text-2xl">
                    {user.username}
                </h1>
                <ImageUpload
                    style={"h-72"}
                    initialValue={imageSrc ? imageSrc : ""}
                    getImage={(image) => (imageRef.current = image)}
                />
            </Section>

            <Section label={"about-container"}>
                <h1>What you should know about me</h1>
                <TextArea
                    initialValue={
                        profile?.description ? profile.description : ""
                    }
                    handleChange={(description) =>
                        (formRef.current.description = description)
                    }
                />
                <div>
                    <DateInput
                        label={"BirthDate"}
                        initialDate={profile?.dateOfBirth}
                        getDate={(date) => {
                            formRef.current.dateOfBirth = date;
                        }}
                    />
                </div>
                {/* slider */}
                <div className="multi-range-slider-container">
                    <h1 className="min-w-48">Select age range</h1>
                    <MultiRangeSlider
                        ruler={false}
                        min={18}
                        max={99}
                        step={5}
                        minValue={18} // set naar min age als doorgegeven
                        maxValue={99} // set naar max age als doorgegeven
                        barInnerColor="#f688c1"
                        barLeftColor="#D8B4FE"
                        barRightColor="#D8B4FE"
                        thumbLeftColor="#FFFFFF"
                        thumbRightColor="#FFFFFF"
                        onInput={(e: ChangeResult) => {
                            formRef.current.minAge = e.minValue;
                            formRef.current.maxAge = e.maxValue;
                            console.log("min age: ", e.minValue);
                            console.log("max age: ", e.maxValue);
                        }}
                    ></MultiRangeSlider>
                </div>
                {/*slider */}
                <DropDownSelect
                    label={"I am a"}
                    category={"gender"}
                    options={genders}
                    onSelect={(gender) =>
                        (formRef.current.gender = gender.toUpperCase())
                    }
                    initialValue={
                        profile?.gender ? profile.gender.toLowerCase() : ""
                    }
                />
                <ScrollContainer
                    label={"Looking for"}
                    height={"h-12"}
                    width={"w-36"}
                >
                    <ul>
                        {genders.map((gender) => (
                            <li key={gender.id}>
                                <Checkbox
                                    targetId={gender.id}
                                    content={gender.value}
                                    handleChange={(id, isChecked) =>
                                        handleGenderChange(
                                            formRef.current.lookingForGender,
                                            id,
                                            isChecked
                                        )
                                    }
                                    isChecked={profile?.lookingForGender.includes(
                                        gender.value.toUpperCase()
                                    )}
                                />
                            </li>
                        ))}
                    </ul>
                </ScrollContainer>
            </Section>

            <Section label={"personal-details-container"}>
                <ScrollContainer
                    label={"Preferences"}
                    height={"h-24"}
                    headerStyle={"font-extrabold m-4"}
                >
                    <ul>
                        {preferences &&
                            preferences.map((pref) => (
                                <li key={pref.id}>
                                    <Checkbox
                                        targetId={pref.id}
                                        content={pref.name}
                                        handleChange={(id, isChecked) =>
                                            handleCheckboxChange(
                                                formRef.current.preferences,
                                                id,
                                                isChecked
                                            )
                                        }
                                        isChecked={profile?.preferences.some(
                                            (p: IFetchOption) =>
                                                p.id === pref.id
                                        )}
                                    />
                                </li>
                            ))}
                    </ul>
                </ScrollContainer>
                <ScrollContainer
                    label={"Gender identity"}
                    height={"h-24"}
                    headerStyle={"font-extrabold m-4"}
                >
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
                            id: trait.trait.id,
                            value: trait.trait.question,
                            extra: trait.answer,
                        }))}
                        getSelected={(selectedTraits) => {
                            formRef.current.traits = selectedTraits.map(
                                (trait) => ({
                                    id: trait.id,
                                    answer: trait.extra
                                        .replace(" ", "_")
                                        .toUpperCase(),
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
            </Section>
            <Button content={"Submit"} handleClick={saveProfile} />
        </div>
    );
};

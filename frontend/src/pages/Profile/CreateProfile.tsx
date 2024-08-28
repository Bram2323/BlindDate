import { useEffect, useState } from "react";
import { useUser } from "../../services/UserService";
import ApiService from "../../services/ApiService";
import { TextArea } from "./components/TextArea";
import { ImageUpload } from "./components/ImageUpload";
import { DropDownSelect } from "./components/DropDownSelect";
import { ScrollContainer } from "./components/ScrollContainer";
import Checkbox from "./components/Checkbox";
import { EnhancedDropdown } from "./components/EnhancedDropdown";
import { Button } from "../../generic/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useValidators from "../../hooks/useValidators";
import "react-datepicker/dist/react-datepicker.css";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { IProfile, IFetchOption, ITrait } from "./components/ProfileInterfaces";
import { DateInput } from "./components/DateInput";
import { Warning } from "../../generic/Warning";
import { Section } from "./components/Section";
import { LabelBox } from "./components/LabelBox";
import { CheckBoxList } from "./components/CheckBoxList";
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
    const [traits, setTraits] = useState<ITrait[]>();
    const imageRef = useRef<File | null>(null);
    const formRef = useRef<IProfile>({
        imageId: null,
        dateOfBirth: "",
        minAge: 0,
        maxAge: 99,
        gender: "",
        lookingForGender: [],
        description: "",
        sexualities: [],
        preferences: [],
        interests: [],
        traits: [],
    });
    const genders = [
        { id: 1, value: "male" },
        { id: 2, value: "female" },
        { id: 3, value: "nonbinary" },
        { id: 4, value: "other" },
    ];

    const sectionsBgColors = [
        "bg-yellow-300",
        "bg-purple-300",
        "bg-blue-300",
        "bg-pink-300",
        "bg-green-300",
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
                if (error.response && error.response.status != 404) {
                    console.error(error);
                }
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
                (sex: any) => sex.id
            );
            formRef.current.interests = formRef.current.interests.map(
                (interest: any) => interest.id
            );
            formRef.current.preferences = formRef.current.preferences.map(
                (pref: any) => pref.id
            );
        }
    }, [profileExists]);

    useEffect(() => {
        fetchData("sexualities", setSexualities);
        fetchData("interests", setInterests);
        fetchData("traits", setTraits);
        fetchData("preferences", setPreferences);
        fetchProfileData().then((res) => {
            setProfile(res.profile);
            setImageUrl(res.imageUrl);
        });
    }, []);

    const fetchData = (url: string, setState: any) => {
        ApiService.get(url)
            .then((response) => {
                setState(response.data);
            })
            .catch((error) => console.error(error));
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
        <div className="w-full flex flex-col items-center justify-center p-4">
            <Warning
                message={error}
                duration={3000}
                warningColor={"bg-red-500"}
            />
            <Section label={"img-container"} style={sectionsBgColors[0]}>
                <LabelBox content={user.username} style={"text-xl w-full"} />
                <ImageUpload
                    style={"h-72"}
                    initialValue={imageSrc ? imageSrc : ""}
                    getImage={(image) => (imageRef.current = image)}
                />
            </Section>

            <Section label={"gender-info"} style={sectionsBgColors[1]}>
                <LabelBox content={"Gender"} style={"w-full"} />
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
                <ul className="flex flex-col gap-2">
                    <li className="text-center">Looking for</li>
                    {genders.map((gender) => (
                        <li
                            key={gender.id}
                            className="bg-white border-2 border-gray-800 rounded-lg shadow-lg"
                        >
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
            </Section>

            <Section label={"about-container"} style={sectionsBgColors[2]}>
                <LabelBox content={"About me"} style={"w-full"} />
                <TextArea
                    initialValue={
                        profile?.description ? profile.description : ""
                    }
                    handleChange={(description) =>
                        (formRef.current.description = description)
                    }
                />
            </Section>

            <Section
                label={"gender-identities-box"}
                style={sectionsBgColors[0]}
            >
                <LabelBox content={"Gender identity"} style={"w-full"} />
                <ScrollContainer
                    height={"h-48"}
                    headerStyle={"font-extrabold m-4"}
                >
                    {sexualities && (
                        <CheckBoxList
                            options={sexualities}
                            initialValues={profile ? profile.sexualities : []}
                            getIdList={(list: any) => {
                                formRef.current.sexualities = list;
                            }}
                        />
                    )}
                </ScrollContainer>
            </Section>

            <Section label={"age-data-box"} style={sectionsBgColors[3]}>
                <LabelBox content={"Age & Preference"} style={"w-full"} />
                <div>
                    <DateInput
                        label={"BirthDate"}
                        initialDate={profile?.dateOfBirth}
                        getDate={(date) => {
                            formRef.current.dateOfBirth = date;
                        }}
                    />
                </div>
                {/* slider: https://www.npmjs.com/package/multi-range-slider-react */}
                <h1 className="min-w-48">Select age range</h1>
                <div className="multi-range-slider-container bg-white rounded-lg p-4 shadow-2xl border-2 border-gray-800 w-full">
                    <MultiRangeSlider
                        min={18}
                        max={99}
                        minValue={profile?.minAge ? profile.minAge : 18} // set naar min age als doorgegeven
                        maxValue={profile?.maxAge ? profile.maxAge : 99} // set naar max age als doorgegeven
                        barInnerColor="#f688c1"
                        barLeftColor="#D8B4FE"
                        barRightColor="#D8B4FE"
                        thumbLeftColor="#FFFFFF"
                        thumbRightColor="#FFFFFF"
                        onInput={(e: ChangeResult) => {
                            formRef.current.minAge = e.minValue;
                            formRef.current.maxAge = e.maxValue;
                        }}
                        style={{
                            border: "none",
                            background: "none",
                            padding: "10px",
                            boxShadow: "none",
                        }}
                    ></MultiRangeSlider>
                </div>
            </Section>

            <Section label={"preferences-box"} style={sectionsBgColors[4]}>
                <LabelBox content={"Morals & Values"} style={"w-full"} />
                <ScrollContainer
                    height={"h-48"}
                    headerStyle={"font-extrabold m-4"}
                >
                    {preferences && (
                        <CheckBoxList
                            options={preferences}
                            initialValues={profile ? profile.preferences : []}
                            getIdList={(list: any) => {
                                formRef.current.preferences = list;
                            }}
                        />
                    )}
                </ScrollContainer>
            </Section>

            <Section label={"traits-box"} style={sectionsBgColors[1]}>
                <LabelBox content={"Q&A"} style={"w-full text-center"} />
                {traits && (
                    <EnhancedDropdown
                        label={"Traits"}
                        category={"Trait"}
                        options={traits?.map((trait: any) => ({
                            id: trait.id,
                            value: trait.question,
                        }))}
                        extraOptions={["yes", "no", "it depends"]}
                        initialValues={profile?.traits.map((trait: any) => ({
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
            </Section>

            <Section label={"interest-box"} style={sectionsBgColors[2]}>
                <LabelBox content={"Interests"} style={"w-full"} />
                {interests && (
                    <EnhancedDropdown
                        category="interest"
                        options={interests.map((interest) => ({
                            id: interest.id,
                            value: interest.name,
                        }))}
                        initialValues={profile?.interests.map(
                            (interest: any) => ({
                                id: interest.id,
                                value: interest.name,
                            })
                        )}
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

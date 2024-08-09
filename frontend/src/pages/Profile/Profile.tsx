import { useEffect, useState } from "react";
import { useUser } from "../../services/UserService";
import ApiService from "../../services/ApiService";
import FieldInput from "../../generic/FieldInput";
import { TextArea } from "../../generic/TextArea";
import { ImageUpload } from "../../generic/ImageUpload";
import { DropDownSelect } from "../../generic/DropDownSelect";
import { ScrollContainer } from "../../generic/ScrollContainer";
import Checkbox from "../../generic/Checkbox";

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
            console.error(error);
            return { profile: null, imageUrl: "" };
        });
};

export const Profile = () => {
    const [user, loggedIn] = useUser();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageUrl] = useState<string>();
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

    useEffect(() => {
        fetchProfileData().then((res) => {
            setProfile(res.profile);
            setImageUrl(res.imageUrl);
            fetchData("sexualities", setSexualities);
            fetchData("interests", setInterests);
            fetchData("traits", setTraits);
        });
    }, []);

    const fetchData = (url: string, setState: any) => {
        ApiService.get(url)
            .then((response) => {
                setState(response.data);
                //console.log(response.data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            Attempt 45: {user.username}
            <div>
                <FieldInput
                    content={profile?.username ? profile.username : ""}
                    handleChange={(value) => {
                        console.log("new value ", value);
                    }}
                />

                <ImageUpload
                    initialValue={imageSrc ? imageSrc : ""}
                    getImage={(e) => {
                        console.log(e);
                    }}
                />

                <TextArea
                    initialValue={
                        profile?.description ? profile.description : ""
                    }
                    handleChange={(value) => {
                        console.log(value);
                    }}
                />

                <DropDownSelect
                    label={"Gender"}
                    category={"gender"}
                    options={genders}
                    onSelect={(value) => {
                        console.log(value);
                    }}
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
                    onSelect={(value) => {
                        console.log(value);
                    }}
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
                        {sexualities ? (
                            sexualities.map((sex) => (
                                <li key={sex.id}>
                                    <Checkbox
                                        targetId={sex.id}
                                        content={sex.name}
                                        handleChange={(id, isChecked) => {
                                            console.log(id, " ", isChecked);
                                            console.log(profile?.sexualities);
                                        }}
                                        isChecked={profile?.sexualities.some(
                                            (s) => s.id === sex.id
                                        )}
                                    />
                                </li>
                            ))
                        ) : (
                            <p>Error loading list</p>
                        )}
                    </ul>
                </ScrollContainer>
            </div>
        </div>
    );
};

interface Profile {
    dateOfBirth: string;
    description: string;
    gender: string;
    id: number;
    imageId: number;
    interests: [];
    lookingForGender: string;
    sexualities: [];
    traits: [];
    userId: string;
    username: string;
}

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

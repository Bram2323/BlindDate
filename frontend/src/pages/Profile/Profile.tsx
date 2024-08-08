import { useEffect, useState } from "react";
import { useUser } from "../../services/UserService";
import ApiService from "../../services/ApiService";
import FieldInput from "../../generic/FieldInput";
import { TextArea } from "../../generic/TextArea";
import { ImageUpload } from "../../generic/ImageUpload";
import { DropDownSelect } from "../../generic/DropDownSelect";

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
    // krijg user data in het scherm
    const [user, loggedIn] = useUser();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageUrl] = useState<string>();

    useEffect(() => {
        fetchProfileData().then((res) => {
            setProfile(res.profile);
            setImageUrl(res.imageUrl);
            console.log(res);
        });
    }, []);

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

                {/* todo voor morgen, die checkbox in een scroll container met initial values */}
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

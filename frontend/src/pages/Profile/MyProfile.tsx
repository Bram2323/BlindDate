import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { IProfile } from "./components/ProfileInterfaces";
import { ProfileView } from "./ProfileView";

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
            throw error;
        });
};

function MyProfile() {
    const [profile, setProfile] = useState<IProfile>();
    const [imageSrc, setImageSrc] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileData()
            .then(({ profile, imageUrl }) => {
                setProfile(profile);
                setImageSrc(imageUrl);
                console.log(profile);
            })
            .catch((error) => {
                if (error.response.status == 404) navigate("/create-profile");
            });
    }, []);

    return (
        <>
            <ProfileView profile={profile} imageSrc={imageSrc} canEdit={true} />
        </>
    );
}

export default MyProfile;

import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { ProfileSection } from "./components/ProfileSection";

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

const ProfileDetails: React.FC<ProfileDetails> = ({ profile, imageSrc }) => (
    <div>
        <h3>{profile.username}</h3>
        <img src={imageSrc} alt={`Profile picture of ${profile.username}`} />
        <p>{profile.description}</p>
        <p>I am a {profile.gender}</p>
        <p>I am looking for a {profile.lookingForGender}</p>
        <ProfileSection title="Sexuality" items={profile.sexualities} />
        <ProfileSection
            title="Interests"
            items={profile.interests}
            style={"border-2"}
        />
        <TraitsList traits={profile.traits} />
    </div>
);
const TraitsList = ({ traits }: Traits) => (
    <ul>
        {traits.map((trait) => (
            <li className="border-2" key={trait.id}>
                <p>{trait.trait.question}</p>
                <p>{trait.answer}</p>
            </li>
        ))}
    </ul>
);

export const ProfileView = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        fetchProfileData().then(({ profile, imageUrl }) => {
            console.log(profile);
            setProfile(profile);
            setImageSrc(imageUrl);
        });
    }, []);

    return (
        <div>
            {profile && (
                <div id="image-container">
                    <ProfileDetails profile={profile} imageSrc={imageSrc} />
                </div>
            )}
        </div>
    );
};

interface List {
    id: number;
    name: string;
}

interface Profile {
    id: number;
    username: string;
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: List[];
    interests: List[];
    traits: { id: number; trait: { question: string }; answer: string }[];
    imageId: number;
}

interface Traits {
    traits: { id: number; trait: { question: string }; answer: string }[];
}

interface ProfileDetails {
    profile: Profile;
    imageSrc: string;
}

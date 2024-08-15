import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { ProfileSection } from "./components/ProfileSection";
import { Button } from "../../generic/Button";
import { useNavigate } from "react-router-dom";
import { Section } from "./components/Section";

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

const TraitsList = ({ traits }: Traits) => (
    <div className="w-full rounded-lg bg-white p-4">
        <h1 className="font-extrabold tracking-wider text-center">Q&A</h1>
        <ul className="w-full flex flex-col items-center justify-center">
            {traits.map((trait) => (
                <li
                    className="w-full flex flex-row items-center justify-between p-4 border-b-2 border-feminine-primary-dark rounded-lg shadow-lg"
                    key={trait.id}
                >
                    <p>{trait.trait.question}</p>
                    <p className="capitalize">
                        {trait.answer.toLowerCase().replace("_", " ")}
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

export const ProfileView = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageSrc] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileData()
            .then(({ profile, imageUrl }) => {
                setProfile(profile);
                setImageSrc(imageUrl);
            })
            .catch((error) => {
                if (error.response.status == 404) navigate("/create-profile");
            });
    }, []);

    return (
        <>
            {profile ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="p-4 w-full flex flex-col items-end">
                        <Button
                            content={"edit"}
                            handleClick={() => {
                                navigate("/create-profile");
                            }}
                        />
                    </div>
                    <Section label={"img-container"}>
                        <h1 className="font-extrabold tracking-wider text-2xl p-4">
                            {profile?.username}
                        </h1>
                        {<img src={imageSrc} className="rounded-lg h-56" />}
                        <span className="p-2">{profile?.age} years</span>
                        <div className="w-2/3 p-4 flex flex-row items-center justify-between ">
                            <span className="border-2 border-feminine-secondary-dark p-2 bg-feminine-secondary-dark rounded-lg text-white tracking-wider">
                                {profile?.gender.toLocaleLowerCase()}
                            </span>
                            <span className="font-bold tracking-wider">
                                looking for
                            </span>
                            <div className="flex flex-col overflow-scroll min-w-fit h-10 border-2 border-feminine-secondary-dark p-2 bg-feminine-secondary-dark rounded-lg text-white tracking-wider">
                                {profile?.lookingForGender &&
                                    profile.lookingForGender.map(
                                        (gender, index) => (
                                            <span key={gender + index}>
                                                {gender.toLowerCase()}
                                            </span>
                                        )
                                    )}
                            </div>
                        </div>
                    </Section>

                    <Section label={"about-container"}>
                        <p className="text-2xl font-extrabold tracking-wider">
                            About me
                        </p>
                        <div className="w-full my-4 bg-white p-4 min-h-36 rounded-lg shadow-lg">
                            {profile?.description}
                        </div>
                    </Section>

                    <Section label={"personal-details-container"}>
                        <ProfileSection
                            title="Preferences"
                            items={profile?.preferences}
                        />
                        <ProfileSection
                            title="Gender identities"
                            items={profile?.sexualities}
                        />
                        <ProfileSection
                            title="Thinks i like"
                            items={profile?.interests}
                            style={""}
                        />
                        <TraitsList traits={profile?.traits} />
                    </Section>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
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
    age: number;
    gender: string;
    lookingForGender: string[];
    sexualities: List[];
    interests: List[];
    preferences: List[];
    traits: { id: number; trait: { question: string }; answer: string }[];
    imageId: number;
}

interface Traits {
    traits: { id: number; trait: { question: string }; answer: string }[];
}

import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { ProfileSection } from "./components/ProfileSection";
import { Button } from "../../generic/Button";
import { useNavigate } from "react-router-dom";
import { Section } from "./components/Section";
import { LabelBox } from "./components/LabelBox";

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
    <div className="w-full rounded-lg p-4">
        <h1 className="font-extrabold tracking-wider text-center">Q&A</h1>
        <ul className="w-full flex flex-col items-center justify-center">
            {traits.map((trait) => (
                <li
                    className="w-full flex flex-row items-center justify-between p-4 rounded-lg shadow-lg bg-white my-4"
                    key={trait.id}
                >
                    <p className="text-left text-sm">{trait.trait.question}</p>
                    <p className="text-right capitalize font-bold">
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
                    <Section
                        label={"img-container"}
                        style={"bg-green-300 border-2 border-green-800"}
                    >
                        <h1 className="font-extrabold tracking-wider text-2xl p-4">
                            {profile?.username}
                        </h1>
                        {<img src={imageSrc} className="rounded-lg h-56" />}
                        <LabelBox
                            content={`${profile?.age} years`}
                            style={"my-2"}
                        />
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <LabelBox content={profile?.gender.toLowerCase()} />
                            <span className="font-bold tracking-wider ">
                                looking for
                            </span>
                            <ul className="flex gap-2">
                                {profile?.lookingForGender &&
                                    profile.lookingForGender.map(
                                        (gender, index) => (
                                            <LabelBox
                                                content={gender.toLowerCase()}
                                            />
                                        )
                                    )}
                            </ul>
                        </div>
                    </Section>

                    <Section
                        label={"about-container"}
                        style="bg-purple-300 border-2 border-purple-800 py-4"
                    >
                        <p className="text-2xl font-extrabold tracking-wider">
                            About me
                        </p>
                        <div className="w-full my-4 bg-white p-4 min-h-48 rounded-lg shadow-lg">
                            {profile?.description}
                        </div>
                    </Section>

                    <Section
                        label={"preference-container"}
                        style={"bg-blue-300 border-2 border-blue-800"}
                    >
                        <ProfileSection
                            title="Preferences"
                            items={profile?.preferences}
                        />
                    </Section>

                    <Section
                        label={"gender-identity-container"}
                        style={"bg-pink-300 border-2 border-pink-800"}
                    >
                        <ProfileSection
                            title="Gender identities"
                            items={profile?.sexualities}
                        />
                    </Section>

                    <Section
                        label={"interest-container"}
                        style={"bg-green-300 border-2 border-green-800"}
                    >
                        <ProfileSection
                            title="Thinks i like"
                            items={profile?.interests}
                            style={""}
                        />
                    </Section>

                    <Section
                        label={"traits-container"}
                        style={"bg-purple-300 border-2 border-purple-800"}
                    >
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

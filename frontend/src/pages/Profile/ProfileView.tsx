import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { ProfileSection } from "./components/ProfileSection";
import { Button } from "../../generic/Button";
import { useNavigate } from "react-router-dom";
import { Section } from "./components/Section";
import { LabelBox } from "./components/LabelBox";
import { TraitsList } from "./components/TraitsList";
import { IProfile } from "./components/ProfileInterfaces";

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

export const ProfileView = () => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [imageSrc, setImageSrc] = useState<string>("");
    const navigate = useNavigate();
    const sectionsBgColors = [
        "bg-yellow-300",
        "bg-purple-300",
        "bg-blue-300",
        "bg-pink-300",
        "bg-green-300",
    ];

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

    // useEffect(() => {
    //     ApiService.get("profiles").then((response) => {
    //         console.log(response.data);
    //     });
    // }, []);

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
                        style={sectionsBgColors[0]}
                    >
                        <LabelBox
                            content={
                                profile?.username
                                    ? profile.username
                                    : "not found"
                            }
                            style={"m-4 text-2xl"}
                        />
                        {<img src={imageSrc} className="rounded-lg h-56" />}
                        <LabelBox
                            content={`${profile?.age} years`}
                            style={"mt-4 mb-2"}
                        />
                    </Section>

                    <Section label={"gender-box"} style={sectionsBgColors[1]}>
                        <div className="gap-2 flex flex-col items-center justify-between">
                            <LabelBox content={profile?.gender.toLowerCase()} />
                            <span className="font-bold tracking-wider ">
                                looking for
                            </span>
                            <ul className="flex flex-col gap-2">
                                {profile?.lookingForGender &&
                                    profile.lookingForGender.map(
                                        (gender, index) => (
                                            <LabelBox
                                                key={index}
                                                content={gender.toLowerCase()}
                                            />
                                        )
                                    )}
                            </ul>
                        </div>
                    </Section>

                    <Section
                        label={"about-container"}
                        style={sectionsBgColors[2]}
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
                        style={sectionsBgColors[3]}
                    >
                        <ProfileSection
                            title="Preferences"
                            items={profile?.preferences}
                        />
                    </Section>

                    <Section
                        label={"gender-identity-container"}
                        style={sectionsBgColors[4]}
                    >
                        <ProfileSection
                            title="Gender identities"
                            items={profile?.sexualities}
                        />
                    </Section>

                    <Section
                        label={"interest-container"}
                        style={sectionsBgColors[0]}
                    >
                        <ProfileSection
                            title="Thinks i like"
                            items={profile?.interests}
                            style={""}
                        />
                    </Section>

                    <Section
                        label={"traits-container"}
                        style={sectionsBgColors[1]}
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

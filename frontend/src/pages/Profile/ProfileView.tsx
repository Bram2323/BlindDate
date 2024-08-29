import { ProfileSection } from "./components/ProfileSection";
import { Button } from "../../generic/Button";
import { useNavigate } from "react-router-dom";
import { Section } from "./components/Section";
import { LabelBox } from "./components/LabelBox";
import { TraitsList } from "./components/TraitsList";
import { IProfile } from "./components/ProfileInterfaces";
import { UserReport } from "../Moderator/components/UserReport";
import { useState } from "react";
import Placeholder from "../../assets/images/sst.png";

interface ProfileViewProps {
    profile?: IProfile;
    imageSrc?: string;
    canEdit?: boolean;
    canReport?: boolean;
    judging?: boolean;
}

export const ProfileView = ({
    profile,
    imageSrc,
    canEdit,
    canReport,
    judging,
}: ProfileViewProps) => {
    const navigate = useNavigate();
    const [scroll, setScroll] = useState<boolean>(true);
    const sectionsBgColors = [
        "bg-yellow-300",
        "bg-purple-300",
        "bg-blue-300",
        "bg-pink-300",
        "bg-green-300",
    ];

    if (!profile)
        return (
            <>
                <p>Loading...</p>
            </>
        );
    console.log("prrooooo", profile);

    return (
        <div className="relative w-full">
            <div className="w-full flex flex-col items-center justify-center">
                {canEdit && (
                    <div className="p-4 w-full flex flex-col items-end">
                        <Button
                            content={"edit"}
                            handleClick={() => {
                                navigate("/create-profile");
                            }}
                        />
                    </div>
                )}
                <Section label={"img-container"} style={sectionsBgColors[0]}>
                    {canReport && (
                        <UserReport profileUsername={profile.username} />
                    )}
                    <LabelBox
                        content={
                            profile?.username ? profile.username : "not found"
                        }
                        style={"m-4 text-2xl"}
                    />
                    {judging === undefined || judging === false ? (
                        <img src={imageSrc} className="rounded-lg h-56" />
                    ) : (
                        <img src={Placeholder} className="rounded-lg h-24" />
                    )}
                    <LabelBox
                        content={`${profile?.age} years`}
                        style={"mt-4 mb-2"}
                    />
                </Section>
                <Section label={"gender-box"} style={sectionsBgColors[1]}>
                    <p className="text-2xl font-extrabold tracking-wider m-4">
                        Gender
                    </p>
                    <div className="gap-2 flex flex-col items-center justify-between">
                        <LabelBox content={profile?.gender.toLowerCase()} />
                        {!judging && (
                            <>
                                <span className="font-bold tracking-wider ">
                                    looking for
                                </span>
                                <ul className="flex flex-col gap-2">
                                    {profile.lookingForGender &&
                                        profile.lookingForGender.map(
                                            (gender, index) => (
                                                <LabelBox
                                                    key={index}
                                                    content={gender.toLowerCase()}
                                                />
                                            )
                                        )}
                                </ul>
                            </>
                        )}
                    </div>
                </Section>
                <Section label={"about-container"} style={sectionsBgColors[2]}>
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
                    label={"interest-container"}
                    style={sectionsBgColors[0]}
                >
                    <ProfileSection
                        title="Things i like"
                        items={profile?.interests}
                        style={""}
                    />
                </Section>
                <Section label={"traits-container"} style={sectionsBgColors[1]}>
                    <TraitsList traits={profile?.traits} />
                </Section>
            </div>
        </div>
    );
};

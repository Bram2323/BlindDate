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
    const sectionsBgColors = [
        "bg-blue-200",
        "bg-purple-200",
        "bg-yellow-200",
        "bg-pink-200",
        "bg-green-200",
    ];

    if (!profile)
        return (
            <>
                <p>Loading...</p>
            </>
        );

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
                        style={"m-4 text-2xl w-full border-2 border-gray-600"}
                    />
                    {(judging === undefined || judging === false) && (
                        <img src={imageSrc} className="rounded-lg h-72" />
                    )}

                    <div className="flex flex-col items-center justify-center gap-4 mt-4">
                        <div className="gap-2 flex flex-col items-center justify-between capitalize">
                            <LabelBox content={profile?.gender.toLowerCase()} />
                        </div>

                        <LabelBox content={`${profile?.age} years`} />
                    </div>

                    <div className="w-full my-4 bg-white p-4 min-h-48 rounded-lg shadow-lg border-2 border-gray-600">
                        {profile?.description}
                    </div>
                </Section>

                <Section
                    label={"preference-container"}
                    style={sectionsBgColors[1]}
                >
                    <ProfileSection
                        title="Preferences"
                        items={profile?.preferences}
                    />
                </Section>
                <Section
                    label={"interest-container"}
                    style={sectionsBgColors[2]}
                >
                    <ProfileSection
                        title="Things i like"
                        items={profile?.interests}
                        style={""}
                    />
                </Section>
                <Section label={"traits-container"} style={sectionsBgColors[3]}>
                    <TraitsList traits={profile?.traits} />
                </Section>
            </div>
        </div>
    );
};

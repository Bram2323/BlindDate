import { UserReport } from "../../pages/Moderator/components/UserReport";
import { IProfile } from "../../pages/Profile/components/ProfileInterfaces";
import { Section } from "../../pages/Profile/components/Section";
import { ProfileView } from "../../pages/Profile/ProfileView";
import JudgeProfile from "./JudgeProfile";

function JudgeProfileBox({ profile }: { profile: IProfile }) {
    return (
        <>
            <ProfileView profile={profile} canReport={true} />
        </>
    );
}

export default JudgeProfileBox;

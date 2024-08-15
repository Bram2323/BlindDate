import Sexuality from "./Sexuality";
import Interest from "./Interest";
import ProfileTrait from "./ProfileTrait";

interface JudgeProfile {
    id: number;
    description: string;
    gender: string;
    lookingForGender: string;
    dateOfBirth: Date;
    userId: string;
    username: string;
    sexualities: Sexuality[];
    interests: Interest[];
    traits: ProfileTrait[];
}

export default JudgeProfile;

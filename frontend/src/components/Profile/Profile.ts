import Interests from "./Interests";
import Sexualities from "./Sexualities";

interface Profile {
    id: number;
    description: string;
    gender: string;
    lookingForGender: string;
    dateOfBirth: Date;
    userId: string;
    userName: string;
    sexualities: Sexualities[];
    interests: Interests[];
    imageId: number;
}

export default Profile;

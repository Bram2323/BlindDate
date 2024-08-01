import Genders from "./Genders";
import Sexualities from "./Sexualities";

interface Profile {
    id: number;
    userName: string;
    description: string;
    gender: Genders;
    sexuality: Sexualities;
    dateOfBirth: Date;
}

export default Profile;

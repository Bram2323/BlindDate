import Genders from "./Genders";
import Profile from "./Profile";
import Sexualities from "./Sexualities";

function ProfileBox() {
    let profile: Profile = {
        id: 1,
        userName: "SuperJohn",
        description: "I'm a cool person",
        dateOfBirth: new Date("05-05-1995"),
        gender: Genders.male,
        sexuality: Sexualities.heteroSexual,
    };

    let profileAge: number = Math.floor(
        Math.abs(Date.now() - profile.dateOfBirth.getTime()) /
            (1000 * 3600 * 24) /
            365.25
    );

    return (
        <>
            <div className="flex justify-center">
                <div className="bg-blue-300 flex flex-col items-center px-20 rounded-lg">
                    <p>{profile.userName}</p>
                    <p>{profileAge}</p>
                    <p>{profile.description}</p>
                    <p>{profile.gender}</p>
                    <p>{profile.sexuality}</p>
                </div>
            </div>
        </>
    );
}

export default ProfileBox;
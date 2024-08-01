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

    return (
        <>
            <div></div>
        </>
    );
}

export default ProfileBox;

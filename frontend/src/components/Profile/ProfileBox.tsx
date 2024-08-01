import Genders from "./Genders";
import Profile from "./Profile";
import Sexualities from "./Sexualities";

function ProfileBox() {
    let profile: Profile = {
        id: 1,
        userName: "SuperJohn",
        description: "I'm a cool person",
        dateOfBirth: Date.parse("05-05-1995"),
        gender: Genders.male,
        sexuality: Sexualities.hetroSexual,
    };

    return (
        <>
            <div></div>
        </>
    );
}

export default ProfileBox;

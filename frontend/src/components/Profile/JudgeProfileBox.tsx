import JudgeProfile from "./JudgeProfile";

function JudgeProfileBox({ profile }: { profile: JudgeProfile }) {
    let profileAge: number = Math.floor(
        Math.abs(Date.now() - new Date(profile.dateOfBirth).getTime()) /
            (1000 * 3600 * 24) /
            365.25
    );

    return (
        <>
            <div className="bg-blue-300 flex flex-col items-center my-8 px-16 py-8 rounded-lg shadow-xl">
                <p>{profile.username}</p>
                <p>Age: {profileAge}</p>
                <p>{profile.description}</p>
                <p>I am a: {profile.gender.toLowerCase()}</p>
                <p>Looking for a:</p>
                {profile.lookingForGender.map((item) => (
                    <p key={profile.lookingForGender.indexOf(item)}>
                        -{item.toLowerCase()}
                    </p>
                ))}
                <p>My preferences are:</p>
                {profile.sexualities.map((item) => (
                    <p key={item.id}>-{item.name}</p>
                ))}
                <p>My interests are:</p>
                {profile.interests.map((item) => (
                    <p key={item.id}>-{item.name}</p>
                ))}
            </div>
        </>
    );
}

export default JudgeProfileBox;

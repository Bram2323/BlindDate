import Profile from "./Profile";

function ProfileBox({ profile, pfpSrc }: { profile: Profile; pfpSrc: string }) {
    let profileAge: number = Math.floor(
        Math.abs(Date.now() - new Date(profile.dateOfBirth).getTime()) /
            (1000 * 3600 * 24) /
            365.25
    );

    return (
        <>
            <div className="bg-blue-300 flex flex-col items-center my-8 px-16 py-8 rounded-lg shadow-xl">
                <img
                    src={`${pfpSrc}`}
                    alt={`Profile picture of ${profile.username}`}
                />
                <p>{profile.username}</p>
                <p>{profileAge}</p>
                <p>{profile.description}</p>
            </div>
        </>
    );
}

export default ProfileBox;

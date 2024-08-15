import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import Profile from "../../components/Profile/Profile";
import ProfileBox from "../../components/Profile/ProfileBox";

function Judging() {
    const [profiles, setProfiles] = useState<Profile[]>();

    useEffect(() => {
        ApiService.get("profiles")
            .then((response) => {
                setProfiles(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="flex h-full justify-evenly">
                <div className="flex items-center">
                    <button className="text-8xl bg-red-300 hover:bg-red-500 p-8 rounded-full">
                        ❌
                    </button>
                </div>
                {profiles && <ProfileBox profile={profiles[0]} />}
                <div className="flex items-center">
                    <button className="text-8xl text-green-600 bg-green-300 hover:text-green-800 hover:bg-green-500 p-8 rounded-full">
                        ✔
                    </button>
                </div>
            </div>
        </>
    );
}

export default Judging;

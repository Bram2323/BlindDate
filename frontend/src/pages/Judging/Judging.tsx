import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import JudgeProfile from "../../components/Profile/JudgeProfile";
import JudgeProfileBox from "../../components/Profile/JudgeProfileBox";

function Judging() {
    const [profiles, setProfiles] = useState<JudgeProfile[]>();

    useEffect(() => {
        ApiService.get("profiles/judge-list")
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
                {profiles && <JudgeProfileBox profile={profiles[0]} />}
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

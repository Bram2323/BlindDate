import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import JudgeProfileBox from "../../components/Profile/JudgeProfileBox";
import { IProfile } from "../Profile/components/ProfileInterfaces";

function Judging() {
    const [profiles, setProfiles] = useState<IProfile[]>();
    const [currentProfile, setCurrentProfile] = useState<IProfile>();

    useEffect(() => {
        ApiService.get("profiles/judge-list")
            .then((response) => {
                setProfiles(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        ApiService.get("profiles/my")
            .then((response) => {
                setCurrentProfile(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleAnswer(answer: boolean) {
        if (!profiles || !currentProfile) return;

        ApiService.post("judgements", {
            accepted: answer,
            judgeId: currentProfile.id,
            judgedId: profiles[0].id,
        }).catch((error) => {
            console.error(error);
        });

        if (profiles.length === 1) {
            setProfiles(undefined);
        } else {
            setProfiles(profiles.splice(1));
        }
    }

    return (
        <>
            {!profiles || profiles.length === 0 ? (
                <div className="flex justify-center m-20">
                    <p className="text-3xl">
                        There are no profiles for you to judge
                    </p>
                </div>
            ) : (
                <div className="border-2">
                    <div className="absolute left-2 bottom-5 z-50">
                        <button
                            onClick={() => handleAnswer(false)}
                            className="w-2/3 text-center text-4xl md:text-6xl  bg-red-300 hover:bg-red-500 p-8 rounded-full flex items-center justify-center shadow-lg"
                        >
                            ❌
                        </button>
                    </div>
                    {profiles && <JudgeProfileBox profile={profiles[0]} />}
                    <div className="absolute right-0 bottom-5 z-50">
                        <button
                            onClick={() => handleAnswer(true)}
                            className="w-2/3 text-center text-4xl md:text-6xl text-green-600 bg-green-300 hover:text-green-800 hover:bg-green-500 p-8 rounded-full flex items-center justify-center shadow-lg"
                        >
                            ✔
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Judging;

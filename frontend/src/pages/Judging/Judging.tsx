import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import JudgeProfile from "../../components/Profile/JudgeProfile";
import JudgeProfileBox from "../../components/Profile/JudgeProfileBox";

function Judging() {
    const [profiles, setProfiles] = useState<JudgeProfile[]>();
    const [currentProfile, setCurrentProfile] = useState<JudgeProfile>();

    useEffect(() => {
        ApiService.get("profiles/judge-list")
            .then((response) => {
                setProfiles(response.data);
                console.log(response.data);
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
                <div className="flex h-full justify-evenly">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleAnswer(false)}
                            className="text-8xl bg-red-300 hover:bg-red-500 p-8 rounded-full"
                        >
                            ❌
                        </button>
                    </div>
                    {profiles && <JudgeProfileBox profile={profiles[0]} />}
                    <div className="flex items-center">
                        <button
                            onClick={() => handleAnswer(true)}
                            className="text-8xl text-green-600 bg-green-300 hover:text-green-800 hover:bg-green-500 p-8 rounded-full"
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

import { useUser } from "../../services/UserService";
import PersonalHome from "./PersonalHome/PersonalHome";

export const Home = () => {
    const [user, isLoggedIn] = useUser();

    return (
        <>
            <div className="flex flex-col h-full justify-center items-center p-4">
                {isLoggedIn ? (
                    <>
                        <PersonalHome userId={user.id} />
                    </>
                ) : (
                    <>Home Page</>
                )}
            </div>
        </>
    );
};

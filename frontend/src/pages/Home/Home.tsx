import { useUser } from "../../services/UserService";
import ChatList from "./ChatList/ChatList";

export const Home = () => {
    const [user, isLoggedIn] = useUser();

    return (
        <>
            <div className="flex flex-col h-full justify-center items-center p-4">
                {isLoggedIn ? (
                    <>
                        <ChatList userId={user.id} />
                    </>
                ) : (
                    <>Home Page</>
                )}
            </div>
        </>
    );
};

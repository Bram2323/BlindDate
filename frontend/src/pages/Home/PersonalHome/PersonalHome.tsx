import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ChatList from "./ChatList/ChatList";
import { useNavigate } from "react-router-dom";

interface PersonalHomeProps {
    userId: string;
}

function PersonalHome({ userId }: PersonalHomeProps) {
    const [allChats, setAllChats] = useState<any[]>([]);
    const [unreadChats, setUnreadChats] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.get("chats/user/" + userId).then((response) => {
            setAllChats(response.data);
        });
        ApiService.get("chats/user/" + userId + "/unread").then((response) => {
            setUnreadChats(response.data);
        });
    }, [userId]);

    return (
        <>
            <div className="flex flex-col gap-6 h-full items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="font-extrabold text-3xl text-center">
                        Unread Chats:
                    </h1>
                    <ChatList chats={unreadChats} />
                </div>

                <div className="flex flex-col gap-1">
                    <h1 className="font-extrabold text-3xl text-center">
                        All Chats:
                    </h1>
                    <ChatList chats={allChats} />
                </div>
            </div>
        </>
    );
}

export default PersonalHome;

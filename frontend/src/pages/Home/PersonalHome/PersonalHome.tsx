import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ChatList from "./ChatList/ChatList";
import { useSubscription } from "react-stomp-hooks";
import { useUser } from "../../../services/UserService";

interface PersonalHomeProps {
    userId: string;
}

function PersonalHome({ userId }: PersonalHomeProps) {
    const [allChats, setAllChats] = useState<any[]>([]);
    const [unreadChats, setUnreadChats] = useState<any[]>([]);

    const [user] = useUser();

    const destination = `/user/${user.id}/notification`;
    useSubscription(destination, (response) => {
        const data = JSON.parse(response.body);
        handleNotification(data);
    });

    useEffect(() => {
        ApiService.get("chats/user/" + userId).then((response) => {
            setAllChats(response.data);
        });
        ApiService.get("chats/user/" + userId + "/unread").then((response) => {
            setUnreadChats(response.data);
        });
    }, [userId]);

    function handleNotification(data: any) {
        const chatId = data.chatId;
        const message = data.message;

        const chat = allChats.find((chat) => chat.id == chatId);
        console.log("old chat", chat);
        chat.lastMessage = message;
        console.log("new chat", chat);

        const filteredChats = allChats.filter((chat) => chat.id != chatId);
        const filteredUnreadChats = unreadChats.filter(
            (chat) => chat.id != chatId
        );

        setAllChats([chat, ...filteredChats]);
        setUnreadChats([chat, ...filteredUnreadChats]);
    }

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

import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ChatItem from "./ChatItem";

interface ChatListProps {
    userId: string;
}

function ChatList({ userId }: ChatListProps) {
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        ApiService.get("chats/user/" + userId).then((response) => {
            setChats(response.data);
        });
    }, [userId]);

    return (
        <>
            <div className="h-full w-[800px] flex flex-col gap-2">
                {chats.map((chat, index) => (
                    <ChatItem
                        key={index}
                        id={chat.id}
                        users={[chat.userOne, chat.userTwo]}
                    />
                ))}
            </div>
        </>
    );
}

export default ChatList;

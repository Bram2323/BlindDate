import { useNavigate } from "react-router-dom";
import { User, useUser } from "../../../../services/UserService";

interface ChatItemProps {
    id: string;
    users: User[];
    lastMessage: any;
}

function ChatItem({ id, users, lastMessage }: ChatItemProps) {
    const [currentUser] = useUser();
    const navigate = useNavigate();

    const otherUsers = users.filter((user) => user.id != currentUser.id);
    const containsCurrentUser = otherUsers.length != users.length;

    let userText =
        (containsCurrentUser ? "You, " : "") +
        otherUsers.map((user) => user.username).join(", ");

    return (
        <>
            <div
                className="w-full border border-gray-500 p-2  rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-100 transition flex justify-between"
                onClick={() => navigate("chats/" + id)}
            >
                <p className="font-bold">{userText}</p>
                {lastMessage && (
                    <>
                        <div className="flex gap-1">
                            <p className="text-gray-600 font-semibold">
                                {lastMessage.user.id == currentUser.id
                                    ? "You"
                                    : lastMessage.user.username}
                                :
                            </p>
                            <p className="max-w-[300px] text-ellipsis overflow-hidden text-gray-600">
                                {lastMessage.text}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ChatItem;

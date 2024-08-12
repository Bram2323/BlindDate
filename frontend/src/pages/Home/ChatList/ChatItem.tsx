import { useNavigate } from "react-router-dom";
import { User, useUser } from "../../../services/UserService";

interface ChatItemProps {
    id: string;
    users: User[];
}

function ChatItem({ id, users }: ChatItemProps) {
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
                className="w-full border border-gray-500 p-2 font-bold rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigate("chats/" + id)}
            >
                <p>{userText}</p>
            </div>
        </>
    );
}

export default ChatItem;

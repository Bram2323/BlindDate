import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../services/UserService";

interface ChatItemProps {
    chat: any;
}

function ChatItem({ chat }: ChatItemProps) {
    const [currentUser] = useUser();
    const navigate = useNavigate();

    const users = [chat.userOne, chat.userTwo];
    const lastMessage = chat.lastMessage;

    const otherUsers = users.filter((user) => user.id != currentUser.id);

    const userText = otherUsers.map((user) => user.username).join(", ");

    const closed = chat.closedByUserOne || chat.closedByUserTwo;

    const style = !closed
        ? "border-gray-500 bg-gray-200"
        : "border-red-500 bg-red-100";

    return (
        <>
            <div
                className={`${style} w-full border p-2  rounded-xl cursor-pointer hover:bg-gray-100 transition flex justify-between`}
                onClick={() => navigate("chats/" + chat.id)}
            >
                <p className="font-bold">{userText}</p>
                <div className="flex gap-1">
                    {lastMessage && (
                        <>
                            <p className="text-gray-600 font-semibold">
                                {lastMessage.user.id == currentUser.id
                                    ? "You"
                                    : lastMessage.user.username}
                                :
                            </p>
                            <p className="max-w-[300px] text-ellipsis overflow-hidden text-gray-600">
                                {lastMessage.text}
                            </p>
                        </>
                    )}

                    {closed && (
                        <p className=" font-bold pl-[2px] text-red-600">
                            Closed
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ChatItem;

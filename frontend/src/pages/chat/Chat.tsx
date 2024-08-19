import { useEffect, useState } from "react";
import FieldInput from "../../generic/FieldInput";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import MessageContainer from "./MessageContainer";
import { User, useUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Button } from "../../generic/Button";
import { useConfirm } from "../../hooks/useConfirm";

function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<any>();
    const [otherUsers, setOtherUsers] = useState<User[]>([]);
    const [otherProfile, setOtherProfile] = useState<any>();
    const [containsCurrentUser, setContainsCurrentUser] = useState(false);
    const [currentUser] = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [confirmElement, confirm] = useConfirm();

    useEffect(() => {
        ApiService.get("chats/" + id).then((response) => {
            const chat = response.data;
            setChat(chat);
        });
    }, []);

    useEffect(() => {
        if (chat == undefined || currentUser.id == "") return;

        const users = [chat.userOne, chat.userTwo];
        const otherUsers = users.filter((user) => user.id != currentUser.id);
        setOtherUsers(otherUsers);
        setContainsCurrentUser(otherUsers.length != users.length);
    }, [chat, currentUser]);

    useEffect(() => {
        if (otherUsers.length != 1) return;
        const otherUser = otherUsers[0];

        ApiService.get("profiles/" + otherUser.id).then((response) => {
            setOtherProfile(response.data);
        });
    }, [otherUsers]);

    function postMessage() {
        if (message.trim().length == 0) return;
        setMessage("");

        ApiService.post("chats/" + id, { text: message })
            .then((response) => {
                setChat({
                    ...chat,
                    messages: [...chat.messages, response.data],
                });
            })
            .catch((error) => {
                if (error.response.data.detail == "This chat is closed!") {
                    console.log("test", error);
                    window.location.reload();
                }
            });
    }

    function closeChat() {
        if (!containsCurrentUser) return;

        confirm(
            [
                "Do you want to close this chat?",
                "This action can not be undone!",
            ],
            () => {
                ApiService.delete("chats/" + id).then(() => navigate("/"));
            }
        );
    }

    if (chat == undefined) return <></>;

    const userText =
        (containsCurrentUser ? "You, " : "") +
        otherUsers.map((user) => user.username).join(", ");

    const closed = chat.closedByUserOne || chat.closedByUserTwo;
    const borderColor = !closed ? "border-gray-500" : "border-red-600";

    return (
        <>
            {confirmElement}
            <div className="flex flex-col h-full items-center justify-center">
                <div
                    className={`${borderColor} bg-gray-100 w-[500px] h-[750px] rounded-xl border-2  flex flex-col items-center justify-center overflow-hidden`}
                >
                    <div
                        className={`${borderColor} relative p-2 bg-gray-200 w-full text-center font-bold border-b-2 rounded-t-xl`}
                    >
                        <p>{userText}</p>
                        <div className="absolute w-full h-full top-0 left-0 flex flex-row-reverse items-center justify-between p-1">
                            <Button
                                content="Close"
                                style="text-sm p-0 px-2 rounded-md h-full"
                                handleClick={closeChat}
                            />
                            {closed && (
                                <p className="text-red-600 pl-1">Closed</p>
                            )}
                        </div>
                    </div>
                    <MessageContainer
                        messages={chat.messages}
                        rightUser={
                            containsCurrentUser ? currentUser : chat.userOne
                        }
                        imageId={otherProfile && otherProfile.imageId}
                    />
                    {!closed && (
                        <div className="w-full border-gray-400 border-t-2">
                            <FieldInput
                                content={message}
                                layout="w-full justify-self-end border-2 bg-gray-100 rounded-b-lg border-none"
                                style="w-full rounded-xl"
                                handleChange={(e) => setMessage(e)}
                                onSubmit={postMessage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Chat;

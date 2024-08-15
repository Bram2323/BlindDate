import { useEffect, useState } from "react";
import FieldInput from "../../generic/FieldInput";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import MessageContainer from "./MessageContainer";
import { useUser } from "../../services/UserService";

function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<any>();
    const [currentUser, loggedIn] = useUser();
    const { id } = useParams();

    useEffect(() => {
        ApiService.get("chats/" + id).then((response) => {
            setChat(response.data);
        });
    }, []);

    function postMessage() {
        if (message.trim().length == 0) return;
        setMessage("");

        ApiService.post("chats/" + id, { text: message }).then((response) => {
            setChat({ ...chat, messages: [...chat.messages, response.data] });
        });
    }

    if (chat == undefined) return <></>;

    const users = [chat.userOne, chat.userTwo];
    const otherUsers = users.filter((user) => user.id != currentUser.id);
    const containsCurrentUser = otherUsers.length != users.length;

    let userText =
        (containsCurrentUser ? "You, " : "") +
        otherUsers.map((user) => user.username).join(", ");

    return (
        <>
            <div className="flex flex-col h-full items-center justify-center">
                <div className=" bg-gray-100 w-[500px] h-[750px] rounded-xl border-y-2 border-gray-500 flex flex-col items-center justify-center">
                    <div className="p-2 bg-gray-200 w-full text-center font-bold border-2 border-gray-500 rounded-t-xl">
                        {userText}
                    </div>
                    <MessageContainer
                        messages={chat.messages}
                        rightUser={
                            containsCurrentUser ? currentUser : chat.userOne
                        }
                        imageId={chat.userOne.imageId}
                    />
                    <FieldInput
                        content={message}
                        layout="w-full justify-self-end border-2 bg-gray-100 rounded-b-lg border-gray-500"
                        style="w-full rounded-xl"
                        handleChange={(e) => setMessage(e)}
                        onSubmit={postMessage}
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;

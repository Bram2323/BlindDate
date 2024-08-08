import { useEffect, useState } from "react";
import FieldInput from "../../generic/FieldInput";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import MessageContainer from "./MessageContainer";
import { useUser } from "../../services/UserService";

function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<any>();
    const [user, loggedIn] = useUser();
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

    let otherUser = undefined;
    if (loggedIn) {
        if (user.id == chat.userOne.id) otherUser = chat.userTwo;
        if (user.id == chat.userTwo.id) otherUser = chat.userOne;
    }

    return (
        <>
            <div className="flex h-full items-center justify-center">
                <div className=" bg-gray-100 w-[500px] h-[750px] p-1 rounded-xl border border-gray-500 flex flex-col items-center justify-center gap-1">
                    <div></div>
                    <MessageContainer
                        messages={chat.messages}
                        leftUser={otherUser ? otherUser : chat.userTwo}
                    />
                    <FieldInput
                        content={message}
                        layout="border-none w-full p-0 justify-self-end"
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

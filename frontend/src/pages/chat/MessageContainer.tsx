import { User } from "../../services/UserService";
import Message from "./Message";

interface MessageContainerProps {
    messages: any;
    leftUser: User;
}

function MessageContainer({ messages, leftUser }: MessageContainerProps) {
    const messageObjects = messages.map((message: any, index: number) => (
        <Message key={index} message={message} leftUser={leftUser} />
    ));

    return (
        <>
            <div className="h-full w-full flex flex-col gap-1 overflow-y-auto">
                {messageObjects}
            </div>
        </>
    );
}

export default MessageContainer;

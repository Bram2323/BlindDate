import { User } from "../../services/UserService";
import Message from "./Message";

interface MessageContainerProps {
    messages: any;
    rightUser: User;
}

function MessageContainer({ messages, rightUser }: MessageContainerProps) {
    const messageObjects = messages.map((message: any, index: number) => (
        <Message key={index} message={message} rightUser={rightUser} />
    ));

    return (
        <>
            <div className="h-full w-full flex flex-col gap-1 overflow-y-auto p-2">
                {messageObjects}
            </div>
        </>
    );
}

export default MessageContainer;

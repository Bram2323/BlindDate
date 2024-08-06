import { User } from "../../services/UserService";

interface MessageProps {
    message: any;
    leftUser: User;
}

function Message({ message, leftUser }: MessageProps) {
    const displayLeft = message.userId == leftUser.id;

    return (
        <>
            <div
                className={` ${
                    !displayLeft && "self-end"
                } border-2 border-gray-500 rounded-xl p-2 w-fit max-w-[90%] text-wrap break-words`}
            >
                {message.text}
            </div>
        </>
    );
}

export default Message;

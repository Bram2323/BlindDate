import { User } from "../../services/UserService";

interface MessageProps {
    message: any;
    rightUser: User;
}

function Message({ message, rightUser }: MessageProps) {
    const displayRight = message.userId == rightUser.id;

    return (
        <>
            <div
                className={` ${
                    displayRight && "self-end"
                } border-2 border-gray-500 rounded-xl p-2 w-fit max-w-[90%] text-wrap break-words`}
            >
                {message.text}
            </div>
        </>
    );
}

export default Message;

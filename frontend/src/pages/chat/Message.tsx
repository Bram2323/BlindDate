import { User } from "../../services/UserService";

interface MessageProps {
    message: any;
    rightUser: User;
}

function Message({ message, rightUser }: MessageProps) {
    const displayRight = message.user.id == rightUser.id;

    return (
        <>
            <div
                className={` ${
                    displayRight && "self-end"
                } border-2 border-gray-500 bg-gray-50 font-bold tracking-wider opacity-55 rounded-xl p-2 w-fit max-w-[90%] text-wrap break-words`}
            >
                {message.text}
            </div>
        </>
    );
}

export default Message;

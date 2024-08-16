import ChatItem from "./ChatItem";

interface ChatListProps {
    chats: any[];
}

function ChatList({ chats }: ChatListProps) {
    const sortedChats = chats.sort(compareChats);

    return (
        <>
            <div className="w-[800px] flex flex-col gap-2">
                {sortedChats.length == 0 && (
                    <p className="text-center">No Chats...</p>
                )}
                {sortedChats.map((chat, index) => (
                    <ChatItem key={index} chat={chat} />
                ))}
            </div>
        </>
    );
}

export default ChatList;

function compareChats(a: any, b: any) {
    const dateA = new Date(
        a.lastMessage ? a.lastMessage.createdOn : a.createdOn
    );
    const dateB = new Date(
        b.lastMessage ? b.lastMessage.createdOn : b.createdOn
    );

    return dateB - dateA;
}

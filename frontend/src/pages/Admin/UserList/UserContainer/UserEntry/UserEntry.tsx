import { User } from "../../../../../services/UserService";

interface UserEntryProps {
    user: User;
    index: number;
}

function UserEntry({ user, index }: UserEntryProps) {
    const color = index % 2 != 0 ? "" : "bg-gray-300";
    const cellStyle = " w-full overflow-hidden text-ellipsis px-1 " + color;

    return (
        <>
            <div className={" col-start-1 " + cellStyle}>{user.username}</div>
            <div className={" col-start-3 " + cellStyle}>{user.firstName}</div>
            <div className={" col-start-5 " + cellStyle}>{user.lastName}</div>
            <div className={" col-start-7 " + cellStyle}>{user.email}</div>
        </>
    );
}

export default UserEntry;

import { useNavigate } from "react-router-dom";
import { User } from "../../../../../services/UserService";

interface UserEntryProps {
    user: User;
    index: number;
}

function UserEntry({ user, index }: UserEntryProps) {
    const navigate = useNavigate();

    let color;
    if (user.enabled) {
        color = index % 2 != 0 ? "" : "bg-gray-300";
    } else {
        color = index % 2 != 0 ? "bg-red-300" : "bg-red-200";
    }
    const cellStyle =
        " relative h-fit w-full overflow-hidden text-ellipsis px-1 cursor-pointer " +
        color;

    return (
        <>
            <div
                className={" col-start-1 " + cellStyle}
                onClick={() => navigate("/admin/users/" + user.id)}
            >
                {user.username}
            </div>
            <div
                className={" col-start-3 " + cellStyle}
                onClick={() => navigate("/admin/users/" + user.id)}
            >
                {user.firstName}
            </div>
            <div
                className={" col-start-5 " + cellStyle}
                onClick={() => navigate("/admin/users/" + user.id)}
            >
                {user.lastName}
            </div>
            <div
                className={" col-start-7 " + cellStyle}
                onClick={() => navigate("/admin/users/" + user.id)}
            >
                {user.email}
            </div>
        </>
    );
}

export default UserEntry;

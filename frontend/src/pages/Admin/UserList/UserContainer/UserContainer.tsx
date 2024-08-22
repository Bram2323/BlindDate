import { User } from "../../../../services/UserService";
import UserEntry from "./UserEntry/UserEntry";

interface UserContainerProps {
    users: User[];
}

const headerCellStyle = " font-bold px-1 ";
const lineColor = " bg-gray-600 ";
const verticalLineStyle = " w-full h-full row-start-1 " + lineColor;

function UserContainer({ users }: UserContainerProps) {
    const lineColumnHeight = users.length + 3;

    return (
        <>
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr)_2px)_minmax(0,2fr)] p-2 bg-gray-200">
                <div className={" col-start-1 " + headerCellStyle}>
                    Username:
                </div>
                <div className={" col-start-3 " + headerCellStyle}>
                    First Name:
                </div>
                <div className={" col-start-5 " + headerCellStyle}>
                    Last Name:
                </div>
                <div className={" col-start-7 " + headerCellStyle}>Email:</div>

                <div
                    className={`${lineColor} row-start-2 col-start-1 col-end-8 h-[2px] `}
                />

                <div
                    className={" col-start-2 " + verticalLineStyle}
                    style={{ gridRowEnd: lineColumnHeight }}
                />
                <div
                    className={" col-start-4 " + verticalLineStyle}
                    style={{ gridRowEnd: lineColumnHeight }}
                />
                <div
                    className={" col-start-6 " + verticalLineStyle}
                    style={{ gridRowEnd: lineColumnHeight }}
                />

                {users.map((user, index) => (
                    <UserEntry key={index} user={user} index={index} />
                ))}
            </div>
        </>
    );
}

export default UserContainer;

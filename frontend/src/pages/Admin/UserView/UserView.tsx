import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../services/UserService";
import ApiService from "../../../services/ApiService";

function UserView() {
    const [user, setUser] = useState<User>();
    const { id } = useParams();

    useEffect(() => fetchUser, []);

    function fetchUser() {
        ApiService.get("users/" + id).then((response) =>
            setUser(response.data)
        );
    }

    if (!user) return <></>;

    return (
        <>
            <div></div>
        </>
    );
}

export default UserView;

import { useEffect, useState } from "react";
import { User } from "../../../services/UserService";
import ApiService from "../../../services/ApiService";
import Pageable from "../../../generic/Pageable";
import FieldInput from "../../../generic/FieldInput";
import UserContainer from "./UserContainer/UserContainer";

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");

    useEffect(() => fetchUsers(currentPage), []);

    function fetchUsers(page: number) {
        const params =
            search.trim().length > 0
                ? { page, search: "%" + search + "%" }
                : { page };

        ApiService.get("users/all", params).then((response) => {
            const data = response.data;
            setUsers(data.content);
            setTotalUsers(data.page.totalElements);
            setTotalPages(data.page.totalPages);
            setCurrentPage(data.page.number + 1);
        });
    }

    function changePage(page: number) {
        fetchUsers(page);
    }

    function searchUsers() {
        fetchUsers(1);
    }

    return (
        <>
            <div className="p-3 w-[90%] flex flex-col gap-2">
                <div>
                    <FieldInput
                        label="Search"
                        layout="flex flex-col border-none w-72 w-full"
                        content={search}
                        handleChange={setSearch}
                        onSubmit={searchUsers}
                        onBlur={searchUsers}
                    />
                    <p>
                        <b>{totalUsers}</b> {totalUsers == 1 ? "user" : "users"}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <Pageable
                        currentPage={currentPage}
                        setPage={changePage}
                        totalPages={totalPages}
                    />
                    <UserContainer users={users} />
                    <Pageable
                        currentPage={currentPage}
                        setPage={changePage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </>
    );
}

export default UserList;

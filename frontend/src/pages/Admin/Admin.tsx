import { Route, Routes } from "react-router-dom";
import UserList from "./UserList/UserList";

function Admin() {
    return (
        <>
            <div className="flex flex-col items-center">
                <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserList />} />
                </Routes>
            </div>
        </>
    );
}

export default Admin;

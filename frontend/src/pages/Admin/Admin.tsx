import { Route, Routes } from "react-router-dom";
import UserList from "./UserList/UserList";
import UserView from "./UserView/UserView";

function Admin() {
    return (
        <>
            <div className="flex flex-col items-center">
                <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserView />} />
                </Routes>
            </div>
        </>
    );
}

export default Admin;

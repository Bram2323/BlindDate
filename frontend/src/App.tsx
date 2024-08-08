import "./App.css";
import history from "./services/History";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { CreateProfile } from "./pages/Profile/CreateProfile";

import Chat from "./pages/chat/Chat";
import { Profile } from "./pages/Profile/Profile";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <NavBar />
            <div className="w-full h-full overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/create-profile" element={<CreateProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/chat/:id" element={<Chat />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

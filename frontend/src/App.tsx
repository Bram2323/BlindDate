import "./App.css";
import history from "./services/History";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import Chat from "./pages/chat/Chat";
import { CreateProfile } from "./pages/Profile/CreateProfile";
import { ProfileView } from "./pages/Profile/ProfileView";
import Judging from "./pages/Judging/Judging";
import { StompSessionProvider } from "react-stomp-hooks";
import ApiService from "./services/ApiService";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <StompSessionProvider
                url="http://localhost:8080/api/v1/websocket"
                connectHeaders={{
                    Authorization: "Bearer " + ApiService.getToken(),
                }}
            >
                <NavBar />
                <div className="w-full h-full overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/create-profile"
                            element={<CreateProfile />}
                        />
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/chats/:id" element={<Chat />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/judging" element={<Judging />} />
                    </Routes>
                </div>
            </StompSessionProvider>
        </>
    );
}

export default App;

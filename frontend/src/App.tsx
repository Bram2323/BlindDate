import "./App.css";
import history from "./services/History";
import {
    useNavigate,
    useLocation,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register/Register";
import { useUser } from "./services/UserService";
import Login from "./pages/Login/Login";
import { CreateProfile } from "./pages/Profile/CreateProfile";
import { ProfileView } from "./pages/Profile/ProfileView";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    const [, isLoggedIn] = useUser();

    return (
        <>
            <NavBar />
            <div className="w-full h-full overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/create-profile"
                                element={<CreateProfile />}
                            />
                            <Route path="/profile" element={<ProfileView />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}
                </Routes>
            </div>
        </>
    );
}

export default App;

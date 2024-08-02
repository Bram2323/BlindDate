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
                        <></>
                    ) : (
                        <>
                            <Route path="/login" element={"login"} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

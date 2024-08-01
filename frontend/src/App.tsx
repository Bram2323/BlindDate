import "./App.css";
import { history } from "./services/History";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import NavBar from "./components/NavBar";
import ProfileBox from "./components/Profile/ProfileBox";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <ProfileBox
            // profile={profile}
            />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;

import "./App.css";
import { history } from "./services/History";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register/Register";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;

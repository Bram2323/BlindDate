import "./App.css";
import {history} from "./services/History";
import {useNavigate, useLocation, Routes, Route} from "react-router-dom";
import Login from "../src/pages/Login";
import {Home} from "./pages/Home";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;

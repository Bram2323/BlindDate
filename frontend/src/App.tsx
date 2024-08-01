import "./App.css";
import {history} from "./services/History";
import {useNavigate, useLocation, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;

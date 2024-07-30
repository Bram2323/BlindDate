import "./App.css";
import { history } from "./services/History";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <div></div>
        </>
    );
}

export default App;

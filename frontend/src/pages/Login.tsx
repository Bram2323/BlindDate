import {useState} from "react";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import FieldInput from "../generic/FieldInput";
import {Button} from "../generic/Button";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const showError = (message: string) => {
        setTimeout(() => {
            setError("");
        }, 3000);
        setError(message);
    };
    const handleLogin = () => {
        if (username.length === 0 || password === "") {
            showError("Enter a username");
        }
        if (password.length === 0 || password === "") {
            showError("Enter a password");
        }
        UserService.login(username, password)
            .then(() => {
                navigate("/home");
            })
            .catch((error: string) => console.error(error));
    };

    return (
        <div className="border-2 p-2">
            <div className={"h-8 border-2 p-2 text-red-600"}>{error}</div>
            <FieldInput
                label={"username"}
                handleChange={(value) => {
                    setUsername(value);
                }}
            />
            <FieldInput
                label={"password"}
                type={"password"}
                handleChange={(value) => {
                    setPassword(value);
                }}
            />
            <Button content="submit" handleClick={handleLogin} />
        </div>
    );
};

export default Login;

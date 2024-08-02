import {useState} from "react";
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import FieldInput from "../../generic/FieldInput";
import {Button} from "../../generic/Button";

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
        if (username.length === 0) {
            showError("Enter a username");
            return;
        }
        if (password.length === 0) {
            showError("Enter a password");
            return;
        }
        UserService.login(username, password)
            .then(navigate("/"))
            .catch((error) => showError(error));
    };

    return (
        <div className="flex flex-col min-h-full items-center justify-center">
            <div className={"h-8 p-2 text-red-600"}>{error}</div>
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

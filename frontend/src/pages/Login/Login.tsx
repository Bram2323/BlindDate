import { useState } from "react";
import { login } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import FieldInput from "../../generic/FieldInput";
import { Button } from "../../generic/Button";
import { Warning } from "../../generic/Warning";

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
        login(username, password)
            .then(() => navigate("/"))
            .catch((error: any) => showError(error));
    };

    return (
        <>
            <div className="flex min-h-full items-center justify-center">
                <div className=" bg-green-300 h-fit p-4 rounded-xl border-2 border-green-800 flex flex-col items-center justify-center">
                    <Warning
                        message={error}
                        duration={2000}
                        warningColor="bg-red-400"
                    />
                    <FieldInput
                        label="Username"
                        content={username}
                        style={"rounded-lg border-green-800"}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value) => {
                            setUsername(value);
                        }}
                    />
                    <FieldInput
                        label="password"
                        content={password}
                        type="password"
                        style={"rounded-lg border-green-800"}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value) => {
                            setPassword(value);
                        }}
                        onSubmit={handleLogin}
                    />
                    <Button
                        content="submit"
                        handleClick={handleLogin}
                        style={"mt-4"}
                    />
                </div>
            </div>
        </>
    );
};

export default Login;

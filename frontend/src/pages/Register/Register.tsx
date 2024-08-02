import { useState } from "react";
import FieldInput from "../../generic/FieldInput";
import { Button } from "../../generic/Button";
import isValidPassword from "../../hooks/usePasswordValidator";
import { register } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function TryRegister() {
        let errors: string[] = [];

        if (username.length < 3)
            errors.push("Username can't be less than 3 characters!");
        if (username.length != username.trim().length)
            errors.push("Username can't have leading or trailing whitespace!");

        if (firstName.length == 0) errors.push("First name can't be blank!");
        if (lastName.length == 0) errors.push("Last name can't be blank!");
        if (email.length == 0) errors.push("Email can't be blank!");

        if (!isValidPassword(password)) errors.push("Password is invalid!");

        if (errors.length > 0) {
            window.alert(errors.join("\n"));
            return;
        }

        register(username, firstName, lastName, email, password).then(() =>
            navigate("/create-profile")
        );
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center">
                <div className=" bg-gray-100 h-fit p-1 rounded-xl border border-gray-500 flex flex-col items-center justify-center">
                    <FieldInput
                        label="Username"
                        content={username}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setUsername(value)}
                    />
                    <FieldInput
                        label="FirstName"
                        content={firstName}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setFirstName(value)}
                    />
                    <FieldInput
                        label="LastName"
                        content={lastName}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setLastName(value)}
                    />
                    <FieldInput
                        label="Email"
                        content={email}
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setEmail(value)}
                    />
                    <FieldInput
                        label="Password"
                        content={password}
                        type="password"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setPassword(value)}
                    />
                    <Button content="Register" handleClick={TryRegister} />
                </div>
            </div>
        </>
    );
}

export default Register;

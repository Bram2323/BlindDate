import { useState } from "react";
import FieldInput from "../../generic/FieldInput";
import { Button } from "../../generic/Button";
import useValidators from "../../hooks/useValidators";
import { register } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Warning } from "../../generic/Warning";

function Register() {
    const { isValidPassword, isValidEmail } = useValidators();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const showError = (message: string) => {
        setTimeout(() => {
            setError("");
        }, 3000);
        setError(message);
    };

    function TryRegister() {
        let errors: string[] = [];

        if (username.length < 3)
            errors.push("Username can't be less than 3 characters!");
        if (username.length != username.trim().length)
            errors.push("Username can't have leading or trailing whitespace!");

        if (firstName.length == 0) errors.push("First name can't be blank!");
        if (lastName.length == 0) errors.push("Last name can't be blank!");
        if (email.length == 0) errors.push("Email can't be blank!");
        if (!isValidEmail(email)) errors.push("Email is invalid!");

        if (password != repeatPassword) errors.push("Passwords don't match!");

        errors.push(...validatePassword(password));

        if (errors.length > 0) {
            showError(errors[0]);
            return;
        }

        register(username, firstName, lastName, email, password).then(() =>
            navigate("/create-profile")
        );
    }

    function validatePassword(password: string) {
        let errors = [];

        let hasUppercase = false;
        let hasLowercase = false;
        let hasNumber = false;
        let hasSpecialCharacter = false;
        for (let i = 0; i < password.length; i++) {
            const chr = password[i];

            if (chr.toUpperCase() != chr.toLowerCase()) {
                if (chr == chr.toUpperCase()) hasUppercase = true;
                else hasLowercase = true;
            } else if (chr.match("[0-9]") != null) hasNumber = true;
            else hasSpecialCharacter = true;
        }

        if (!hasUppercase) errors.push("Password needs an upper case letter!");
        if (!hasLowercase) errors.push("Password needs a lower case letter!");
        if (!hasNumber) errors.push("Password needs a number!");
        if (!hasSpecialCharacter)
            errors.push("Password needs a special character!");

        if (password.length < 8) {
            errors.push("Password needs to have at least 8 characters!");
        }

        return errors;
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center">
                <div className=" bg-blue-200 h-fit p-4 rounded-xl border-2 border-blue-800 flex flex-col gap-3 items-center justify-center relative">
                    <Warning
                        message={error}
                        duration={2000}
                        warningColor="bg-red-400"
                    />
                    <FieldInput
                        label="Username"
                        content={username}
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setUsername(value)}
                    />
                    <FieldInput
                        label="FirstName"
                        content={firstName}
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setFirstName(value)}
                    />
                    <FieldInput
                        label="LastName"
                        content={lastName}
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setLastName(value)}
                    />
                    <FieldInput
                        label="Email"
                        content={email}
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setEmail(value)}
                    />
                    <FieldInput
                        label="Password"
                        content={password}
                        type="password"
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) => setPassword(value)}
                        onSubmit={TryRegister}
                    />
                    <FieldInput
                        label="Repeat Password"
                        content={repeatPassword}
                        type="password"
                        style="rounded-lg border-blue-800"
                        layout="flex flex-col border-none w-72"
                        handleChange={(value: string) =>
                            setRepeatPassword(value)
                        }
                        onSubmit={TryRegister}
                    />
                    <Button content="Register" handleClick={TryRegister} />
                </div>
            </div>
        </>
    );
}

export default Register;

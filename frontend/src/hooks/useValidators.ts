import { useCallback } from "react";
import { IProfile } from "../pages/Profile/components/ProfileInterfaces";

const useValidators = () => {
    const isValidEmail = useCallback((email: string) => {
        if (email.length < 8) return false;
        const emailRegex = new RegExp(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        );

        return emailRegex.test(email);
    }, []);

    const isValidPassword = useCallback((password: string) => {
        if (password.length < 8) return false;
        const passwordRegex = new RegExp(
            "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        );

        return passwordRegex.test(password);
    }, []);

    const validateForm = useCallback((form: IProfile) => {
        if (form.description === "") {
            return false;
        }
        if (form.gender === "" || form.gender.includes("Select a ")) {
            return false;
        }
        if (form.lookingForGender.length === 0) {
            return false;
        }
        if (form.sexualities.length === 0) {
            return false;
        }
        if (form.dateOfBirth === "") {
            return false;
        }
        if (form.interests.length === 0) {
            return false;
        }
        if (form.traits.length === 0) {
            return false;
        }
        return true;
    }, []);

    return {
        isValidEmail,
        isValidPassword,
        validateForm,
    };
};

export default useValidators;

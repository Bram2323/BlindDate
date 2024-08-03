import { useCallback } from "react";

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

    const validateForm = useCallback((form: ProfileForm) => {
        if (form.description === "") {
            return false;
        }
        if (form.gender === "" || form.gender.includes("Select a ")) {
            return false;
        }
        if (
            form.lookingForGender === "" ||
            form.lookingForGender.includes("Select a ")
        ) {
            return false;
        }
        if (form.sexualities.length === 0) {
            return false;
        }
        if (form.dateOfBirth === "") {
            return false;
        }
        if (form.imageId === null || form.imageId < 0) {
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

interface ProfileForm {
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: number[];
    dateOfBirth: string;
    imageId: number;
}

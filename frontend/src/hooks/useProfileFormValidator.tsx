const validateForm = (form: ProfileForm) => {
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

    return true;
};

export default validateForm;

interface ProfileForm {
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: number[];
    dateOfBirth: string;
}

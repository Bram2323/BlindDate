const isValidEmail = (email: string) => {
    if (email.length < 8) return false;
    const emailRegex = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );

    return emailRegex.test(email);
};

export default isValidEmail;

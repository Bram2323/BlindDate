const isValidPassword = (password: string) => {
    if (password.length < 8) return false;
    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export default isValidPassword;

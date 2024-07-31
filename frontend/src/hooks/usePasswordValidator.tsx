const isValidPassword = (password: string) => {
    if (password.length < 8) return false;
    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export default isValidPassword;

/**
 * isValidPassword checks if a given password meets the required criteria.
 * The password must be at least 8 characters long, contain at least one letter,
 * one number, and one special character.
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */

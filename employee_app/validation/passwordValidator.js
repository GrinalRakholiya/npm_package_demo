// passwordValidator.js

export function validatePassword(password) {
    if (password.length < 2) {
        return 'Password should be at least 8 characters long.';
    }
    return null; // Indicates no error
}

export function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        return 'Password and Confirm password must be the same';
    }
    return null; // Indicates no error
}

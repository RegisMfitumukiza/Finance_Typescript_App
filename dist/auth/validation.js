export const validateName = (name) => {
    if (!name.trim()) {
        return "Name is required";
    }
    return null;
};
export const validateEmail = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
        return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return "Please enter a valid email address";
    }
    return null;
};
export const validatePassword = (password) => {
    if (!password.trim()) {
        return "Password is required";
    }
    if (password.length < 8) {
        return "Password should be at least 8 characters";
    }
    return null;
};
//# sourceMappingURL=validation.js.map
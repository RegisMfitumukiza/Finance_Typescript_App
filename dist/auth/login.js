import { findUserByEmail, setCurrentUser } from "./storage.js";
import { validateEmail, validatePassword } from "./validation.js";
import { showToast } from "../ui/toast.js";
export const handleLoginSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form) {
        return;
    }
    const emailInput = form.querySelector("#login-email");
    const passwordInput = form.querySelector("#login-password");
    if (!emailInput || !passwordInput) {
        return;
    }
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const emailError = validateEmail(email);
    if (emailError) {
        showToast(emailError, "error");
        return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
        showToast(passwordError, "error");
        return;
    }
    const user = findUserByEmail(email);
    if (!user) {
        showToast("User does not exist", "error");
        return;
    }
    if (user.password !== password) {
        showToast("Invalid email or password", "error");
        return;
    }
    setCurrentUser(user);
    form.reset();
    showToast("Login successful", "success");
    window.setTimeout(() => {
        window.location.href = "./dashboard.html";
    }, 1000);
};
//# sourceMappingURL=login.js.map
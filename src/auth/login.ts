import { findUserByEmail, setCurrentUser } from "./storage.js";
import { validateEmail, validatePassword } from "./validation.js";
import { showToast } from "../ui/toast.js";

export const handleLoginSubmit = (event: Event): void => {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement | null;

  if (!form) {
    return;
  }

  const emailInput = form.querySelector<HTMLInputElement>("#login-email");
  const passwordInput = form.querySelector<HTMLInputElement>("#login-password");

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

  if (!user || user.password !== password) {
    showToast("Invalid email or password", "error");
    return;
  }

  setCurrentUser(user);
  form.reset();

  showToast("Login successful", "success");
};
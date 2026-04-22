import { addUser, findUserByEmail } from "./storage.js";
import { validateEmail, validateName, validatePassword } from "./validation.js";
import { User } from "../types/user.js";
import { showToast } from "../ui/toast.js";

export const handleRegisterSubmit = (event: Event): void => {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement | null;

  if (!form) {
    return;
  }

  const nameInput = form.querySelector<HTMLInputElement>("#register-name");
  const emailInput = form.querySelector<HTMLInputElement>("#register-email");
  const passwordInput = form.querySelector<HTMLInputElement>("#register-password");

  if (!nameInput || !emailInput || !passwordInput) {
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  const nameError = validateName(name);
  if (nameError) {
    showToast(nameError, "error");
    return;
  }

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

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    showToast("Email already exists", "error");
    return;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  addUser(newUser);
  form.reset();

  showToast("Registration successful. You can now log in.", "success");

  window.setTimeout(() => {
    document.dispatchEvent(new CustomEvent("auth:switch-to-login"));
  }, 1200);
};
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return "Name is required";
  }

  return null;
};

export const validateEmail = (email: string): string | null => {
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

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password should be at least 8 characters";
  }

  return null;
};
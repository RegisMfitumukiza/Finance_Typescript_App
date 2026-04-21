import { User } from "../types/user.js";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const getUsers = (): User[] => {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
    return [];
  }

  return JSON.parse(storedUsers);
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();

  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const storedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedCurrentUser) {
    return null;
  }

  return JSON.parse(storedCurrentUser);
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};
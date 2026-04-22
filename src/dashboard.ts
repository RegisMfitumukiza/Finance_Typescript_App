import { getCurrentUser, removeCurrentUser } from "./auth/storage.js";

function protectDashboard(): void {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "./index.html";
  }
}

function setupLogout(): void {
  const logoutButton = document.getElementById("logout-button");

  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    removeCurrentUser();
    window.location.href = "./index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  protectDashboard();
  setupLogout();
});
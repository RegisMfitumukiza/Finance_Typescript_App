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

function setupSidebarToggle(): void {
    const dashboard = document.querySelector(".dashboard");
    const toggleButton = document.getElementById("sidebar-toggle");

    if (!dashboard || !toggleButton) {
        return;
    }

    toggleButton.addEventListener("click", () => {
        dashboard.classList.toggle("dashboard--collapsed");

        const icon = toggleButton.querySelector(".sidebar__icon");

        if (icon) {
            icon.textContent = dashboard.classList.contains("dashboard--collapsed")
                ? "▶"
                : "◀";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    protectDashboard();
    setupLogout();
    setupSidebarToggle();
});
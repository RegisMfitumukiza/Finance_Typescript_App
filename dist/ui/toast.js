let toastTimeoutId = null;
function getToastContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    return container;
}
export function showToast(message, type = "error") {
    const container = getToastContainer();
    container.innerHTML = `
    <div class="toast toast--${type}">
      <span class="toast__message">${message}</span>
      <button class="toast__close" type="button" aria-label="Close message">×</button>
    </div>
  `;
    const toast = container.querySelector(".toast");
    const closeButton = container.querySelector(".toast__close");
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", () => {
        hideToast();
    });
    requestAnimationFrame(() => {
        toast === null || toast === void 0 ? void 0 : toast.classList.add("toast--visible");
    });
    if (toastTimeoutId) {
        window.clearTimeout(toastTimeoutId);
    }
    toastTimeoutId = window.setTimeout(() => {
        hideToast();
    }, 3000);
}
export function hideToast() {
    const container = document.getElementById("toast-container");
    const toast = container === null || container === void 0 ? void 0 : container.querySelector(".toast");
    if (!container || !toast) {
        return;
    }
    toast.classList.remove("toast--visible");
    window.setTimeout(() => {
        container.innerHTML = "";
    }, 250);
    if (toastTimeoutId) {
        window.clearTimeout(toastTimeoutId);
        toastTimeoutId = null;
    }
}
//# sourceMappingURL=toast.js.map
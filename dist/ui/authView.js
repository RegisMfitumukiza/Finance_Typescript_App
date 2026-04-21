import { handleLoginSubmit } from "../auth/login.js";
import { handleRegisterSubmit } from "../auth/register.js";
function getAuthContainer() {
    const container = document.getElementById("auth-container");
    if (!container) {
        throw new Error("Auth container not found.");
    }
    return container;
}
export function getLoginTemplate() {
    return `
    <div class="auth-card">
      <h2 class="auth-card__title">Login</h2>

      <form class="auth-form" id="login-form">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div class="form-group">
          <label for="login-password">Password</label>

          <div class="password-wrapper">
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="Password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              data-target="login-password"
              aria-label="Toggle password visibility"
            >
              👁
            </button>
          </div>
        </div>

        <button type="submit" class="auth-button">Login</button>

        <p class="auth-switch">
          Need to create an account?
          <a href="#" id="go-to-register">Sign Up</a>
        </p>
      </form>
    </div>
  `;
}
export function getRegisterTemplate() {
    return `
    <div class="auth-card">
      <h2 class="auth-card__title">Register</h2>

      <form class="auth-form" id="register-form">
        <div class="form-group">
          <label for="register-name">Name</label>
          <input
            type="text"
            id="register-name"
            name="name"
            placeholder="Name"
            required
          />
        </div>

        <div class="form-group">
          <label for="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div class="form-group">
          <label for="register-password">Password</label>

          <div class="password-wrapper">
            <input
              type="password"
              id="register-password"
              name="password"
              placeholder="Password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              data-target="register-password"
              aria-label="Toggle password visibility"
            >
              👁
            </button>
          </div>

          <small class="password-hint">
            Password should be at least 8 characters
          </small>
        </div>

        <button type="submit" class="auth-button">Create Account</button>

        <p class="auth-switch">
          Already have an account?
          <a href="#" id="go-to-login">Login</a>
        </p>
      </form>
    </div>
  `;
}
function attachPasswordToggles() {
    const toggleButtons = document.querySelectorAll(".toggle-password");
    toggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            if (!targetId) {
                return;
            }
            const input = document.getElementById(targetId);
            if (!input) {
                return;
            }
            input.type = input.type === "password" ? "text" : "password";
        });
    });
}
function attachAuthSwitchLinks() {
    const registerLink = document.getElementById("go-to-register");
    const loginLink = document.getElementById("go-to-login");
    registerLink === null || registerLink === void 0 ? void 0 : registerLink.addEventListener("click", (event) => {
        event.preventDefault();
        renderAuthView("register");
    });
    loginLink === null || loginLink === void 0 ? void 0 : loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        renderAuthView("login");
    });
}
function attachAuthFormHandlers() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", handleLoginSubmit);
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener("submit", handleRegisterSubmit);
}
export function renderAuthView(view) {
    const container = getAuthContainer();
    if (view === "login") {
        container.innerHTML = getLoginTemplate();
    }
    else {
        container.innerHTML = getRegisterTemplate();
    }
    attachAuthSwitchLinks();
    attachPasswordToggles();
    attachAuthFormHandlers();
}
export function renderLoginView() {
    renderAuthView("login");
}
export function renderRegisterView() {
    renderAuthView("register");
}
//# sourceMappingURL=authView.js.map
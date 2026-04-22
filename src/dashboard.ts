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

function getDashboardElement(): HTMLElement | null {
  return document.querySelector(".dashboard");
}

function updateSidebarToggleIcon(): void {
  const dashboard = getDashboardElement();
  const toggleButton = document.getElementById("sidebar-toggle");

  if (!dashboard || !toggleButton) {
    return;
  }

  const icon = toggleButton.querySelector(".sidebar__icon");

  if (!icon) {
    return;
  }

  icon.textContent = dashboard.classList.contains("dashboard--collapsed")
    ? "▶"
    : "◀";
}

function updateSidebarBrand(): void {
  const dashboard = getDashboardElement();
  const brand = document.getElementById("sidebar-brand");

  if (!dashboard || !brand) {
    return;
  }

  brand.textContent = dashboard.classList.contains("dashboard--collapsed")
    ? "f"
    : "finance";
}

function collapseSidebar(): void {
  const dashboard = getDashboardElement();

  if (!dashboard) {
    return;
  }

  dashboard.classList.add("dashboard--collapsed");
  updateSidebarToggleIcon();
  updateSidebarBrand();
}

function toggleSidebar(): void {
  const dashboard = getDashboardElement();

  if (!dashboard) {
    return;
  }

  dashboard.classList.toggle("dashboard--collapsed");
  updateSidebarToggleIcon();
  updateSidebarBrand();
}

function setupSidebarToggle(): void {
  const toggleButton = document.getElementById("sidebar-toggle");

  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    toggleSidebar();
  });
}

function clearActiveLinks(): void {
  const sidebarLinks = document.querySelectorAll(".sidebar__link");
  const mobileLinks = document.querySelectorAll(".mobile-nav__link");

  sidebarLinks.forEach((link) => {
    link.classList.remove("sidebar__link--active");
  });

  mobileLinks.forEach((link) => {
    link.classList.remove("mobile-nav__link--active");
  });
}

function setActiveSection(sectionName: string): void {
  clearActiveLinks();

  const sidebarLink = document.querySelector<HTMLElement>(
    `.sidebar__link[data-section="${sectionName}"]`
  );
  const mobileLink = document.querySelector<HTMLElement>(
    `.mobile-nav__link[data-section="${sectionName}"]`
  );

  sidebarLink?.classList.add("sidebar__link--active");
  mobileLink?.classList.add("mobile-nav__link--active");

  const pageTitle = document.querySelector<HTMLElement>(".dashboard-title");

  if (!pageTitle) {
    return;
  }

  switch (sectionName) {
    case "transactions":
      pageTitle.textContent = "Transactions";
      break;
    case "budgets":
      pageTitle.textContent = "Budgets";
      break;
    case "pots":
      pageTitle.textContent = "Pots";
      break;
    case "bills":
      pageTitle.textContent = "Recurring Bills";
      break;
    default:
      pageTitle.textContent = "Overview";
  }
}

function setupSidebarLinks(): void {
  const sidebarLinks =
    document.querySelectorAll<HTMLAnchorElement>(".sidebar__link");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionName = link.dataset.section;

      if (!sectionName) {
        return;
      }

      setActiveSection(sectionName);
    });
  });
}

function setupMobileNavLinks(): void {
  const mobileLinks =
    document.querySelectorAll<HTMLAnchorElement>(".mobile-nav__link");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionName = link.dataset.section;

      if (!sectionName) {
        return;
      }

      setActiveSection(sectionName);
    });
  });
}

function setupSeeDetailsCollapse(): void {
  const seeDetailsLinks =
    document.querySelectorAll<HTMLAnchorElement>(".js-see-details");

  seeDetailsLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionName = link.dataset.section;

      if (!sectionName) {
        return;
      }

      const dashboard = getDashboardElement();

      if (dashboard && !dashboard.classList.contains("dashboard--collapsed")) {
        collapseSidebar();
      }

      setActiveSection(sectionName);
    });
  });
}

function setupSidebarBrandClick(): void {
  const brand = document.getElementById("sidebar-brand");

  if (!brand) {
    return;
  }

  brand.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveSection("overview");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  protectDashboard();
  setupLogout();
  setupSidebarToggle();
  setupSidebarLinks();
  setupMobileNavLinks();
  setupSeeDetailsCollapse();
  setupSidebarBrandClick();
  updateSidebarToggleIcon();
  updateSidebarBrand();
});
// Simple admin auth
const ADMIN_PASSWORD = "Paula2026";

export function isAdminAuthenticated() {
  return localStorage.getItem("adminAuth") === "true";
}

export function loginAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("adminAuth", "true");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem("adminAuth");
}
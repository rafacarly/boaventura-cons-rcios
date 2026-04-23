// Multi-user admin auth
const DEFAULT_PASSWORDS = {
  ceo: "88462020",
  paula: "paula123",
};

function getPassword(user) {
  return localStorage.getItem(`override_${user}_pass`) || DEFAULT_PASSWORDS[user];
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem("adminRole");
}

export function getAdminRole() {
  return localStorage.getItem("adminRole"); // "ceo" or "user"
}

export function loginAdmin(password) {
  if (password === getPassword("ceo")) {
    localStorage.setItem("adminRole", "ceo");
    return "ceo";
  }
  if (password === getPassword("paula")) {
    localStorage.setItem("adminRole", "user");
    return "user";
  }
  return null;
}

export function logoutAdmin() {
  localStorage.removeItem("adminRole");
}
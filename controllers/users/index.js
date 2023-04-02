const { registerNewUser } = require("./registerNewUser");
const { login } = require("./login");
const { getCurrentUser } = require("./getCurrentUser");
const { logout } = require("./logout");

module.exports = {
  registerNewUser,
  login,
  getCurrentUser,
  logout,
};

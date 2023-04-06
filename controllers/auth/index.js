const { registerNewUser } = require("./registerNewUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword } = require("./resetPassword");

module.exports = {
  registerNewUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

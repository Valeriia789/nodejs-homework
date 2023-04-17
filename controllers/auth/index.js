const { registerNewUser } = require("./registerNewUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword } = require("./resetPassword");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  registerNewUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerifyEmail,
};

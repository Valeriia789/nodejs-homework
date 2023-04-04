const { AppError } = require("../../utils");

exports.logout = (req, res, next) => {
  const { user } = req;

  if (!user) return next(new AppError(401, "Not authorized"));

  user.token = null;

  return res.status(200).json({
    message: "Successfully Logged Out",
  });
};

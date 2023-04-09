const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../utils");

const checkPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("password");

  if (!(await user.checkPassword(currentPassword, user.password))) {
    return next(new AppError(401, "Current password is wrong"));
  }

  user.password = newPassword;

  await user.save();

  next();
});

module.exports = checkPassword;

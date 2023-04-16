const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../utils");

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) return next(new AppError(404, "User not found"));

  user.verificationToken = null;
  user.verify = true;

  await user.save();

  res.status(200).json({
    message: "Verification successful",
  });
});
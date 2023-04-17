const User = require("../../models/userModel");
const { Email } = require("../../services");
const { catchAsync, AppError } = require("../../utils");

exports.resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return new AppError(401, "Email not found");

  if (user.verify) return new AppError(401, "Email already verify");

  await new Email(
    user,
    `localhost:3000/api/users/verify/${user.verificationToken}`
  ).sendVerificationEmail();

  res.status(200).json({
    message: "Verification instructions sent to your email",
  });
});

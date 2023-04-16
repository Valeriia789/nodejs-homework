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
    `localhost:3000/api/users/verify`
  ).sendVerificationEmail();

  user.verify = true
  user.save()
  
  res.status(200).json({
    message: "Verification successful",
  });
});

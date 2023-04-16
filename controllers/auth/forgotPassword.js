// const nodemailer = require('nodemailer')
const { catchAsync } = require("../../utils");
const User = require("../../models/userModel");
const Email = require("../../services");

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // можна повернути ерор, а можна просто статус 200, раптом хакер перебирає наявні паролі в базі
  if (!user) {
    return res.status(200).json({
      msg: "Password reset instructions sent to your email. :]]",
    });
  }

  const otp = user.createPasswordResetToken();

  await user.save(
    {validateBeforeSave: false,}
  );

  try {
    // protocol - http, https
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${otp}`;

    // send reset url to user email
    console.log("||=============>>>>>>>>>>>");
    console.log(resetUrl);
    console.log("<<<<<<<<<<<=============||");

    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      msg: "Password reset instruction sent to email :]",
    });
  } catch (error) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    await user.save();

    return res.status(200).json({
      msg: "Password reset instructions sent to your email. :]]",
    });
  }
});

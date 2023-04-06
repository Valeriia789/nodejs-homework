const { catchAsync } = require("../../utils");
const User = require("../../models/userModel");

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // можна повернути ерор, а можна просто статус 200, раптом хакер перебирає наявні паролі в базі
  if (!user) {
    return res.status(200).json({
      msg: 'Password reset instructions sent to your email. LOL',
    });
  }

  const otp = user.createPasswordResetToken();

  await user.save() 

  // protocol - http, https
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${otp}`;
  // send to the email

  console.log('||=============>>>>>>>>>>>');
  console.log(resetUrl);
  console.log('<<<<<<<<<<<=============||');

  res.status(200).json({
    msg: 'Password reset instruction sent to email :]',
  });
});

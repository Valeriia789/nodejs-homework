// const User = require("../../models/userModel");
// const { catchAsync, AppError } = require("../../utils");

// exports.resendVerifyEmail = catchAsync(async(req, res) => {
//   const {email} = req.body

//   const user = await User.findOne({email})

//   if (!user) return new AppError(401, 'Email not found')

//   if (user.verify) return new AppError(401, 'Email already verify')

  
//   // const verifyEmail = {
//   //   to: email,
//   //   html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify</a>"`
//   // }

//   // await sendEmail(verifyEmail)

//   res.status(200).json({
//     message: 'Verification successful'
//   });
// })
const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../utils");

exports.verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) return new AppError(404, "User not found");

  user.verificationToken = null;
  user.verify = true;

  await user.save();

  // await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ''})

  res.status(200).json({
    message: "Verification successful",
  });
});

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_EMAIL, META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 2525 (465 - захищений порт, під час передачі треба шифрувати трафік; 25 і 2525 - незахищений)
//   // оскільки вибрали захищений порт, треба secure:
//   secure: true,
//   auth: {
//     // user - пошта, до якої підключаємось на Мета.юа (valeriia.air@meta.ua)
//     user: "valeriia.air@meta.ua",
//     // pass - пароль від цієї пошти
//     pass: META_PASSWORD,
//   },
// };

// // щоб отримати лист, треба за допомогою цього конфігу створити транспорт:
// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "Tramp@example.com", // user.email
//   from: "valeriia.air@meta.ua",
//   subject: "Verification email test",
//   html: "To verify your email please click the link: blablabla",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error));

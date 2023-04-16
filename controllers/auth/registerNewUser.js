const uuid = require("uuid").v4;
const { catchAsync, signToken } = require("../../utils");
const User = require("../../models/userModel");
const Email = require("../../services");

exports.registerNewUser = catchAsync(async (req, res) => {
  const verificationToken = uuid();
  const { name, email, password } = req.body;

  const newUserData = {
    name,
    email,
    password,
    verificationToken,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  // const verifyEmail = {
  //   to: newUser.email, subject: 'Verify your email',
  //   html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${verificationToken}">Click to verify</a>"`
  // }

  try {
    await new Email(newUser, "localhost:3000/").sendHello();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    user: newUser,
    token,
  });
});

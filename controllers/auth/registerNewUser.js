const uuid = require("uuid").v4;
const { catchAsync, signToken } = require("../../utils");
const User = require("../../models/userModel");
const { Email } = require("../../services");

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

  try {
    await new Email(
      newUser,
      `localhost:3000/api/users/verify/${verificationToken}`
    ).sendVerificationEmail();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    user: newUser,
    token,
  });
});

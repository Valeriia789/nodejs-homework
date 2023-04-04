const ImageService = require("../../services/imageService");
const { catchAsync } = require("../../utils");

exports.updateCurrentUser = catchAsync(async (req, res) => {
  // UPDATE ACTIONS - треба дописати

  const { file, user } = req;

  if (file) {
    user.avatarURL = await ImageService.save(
      file,
      { height: 400, width: 300 },
      "avatars",
      "users",
      user.id
    );
  }

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key];
  });

  // можна зберегти через findByIdAndUpdate(user.id), але в цьому немає сенсу, так як цей юзер вже є в req.user
  const updatedUser = await user.save();

  res.status(200).json({
    user: updatedUser,
  });
});

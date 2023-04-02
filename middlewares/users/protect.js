const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const { catchAsync, AppError } = require("../../utils");

// перевіряємо, чи юзер залогінений
const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  // якщо токену немає, значить юзер не залогінений
  if (!token) return next(new AppError(401, "Not logged in"));

  let decoded;

  // якщо токен не валідний,
  // передбачувана нами ерор, загортаємо в try-catch, повертаємо загальну ерору без підказок
  try {
    // якщо токен є, маємо його розкодувати
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, "Not logged in"));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError(401, "Not logged in"));

  req.user = currentUser;

  next();
});

module.exports = protect;

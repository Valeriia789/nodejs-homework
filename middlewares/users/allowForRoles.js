const { AppError } = require("../../utils");

// Use only after 'protect' middleware

const allowForRoles =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    next(new AppError(403, "You are not allowed to view this resource"));
  };

module.exports = allowForRoles;


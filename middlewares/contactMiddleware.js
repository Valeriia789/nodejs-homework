const fs = require("fs").promises;

const { AppError, catchAsync } = require("../utils");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 2) {
    return next(new AppError(400, "Invalid id.."));
  }

  // fetch contact from DB
  const dataFromDB = await fs.readFile("./models/contacts.json");

  // // імітуємо падіння DB, щоб перевірити чи відпрацьовує catchAsync функція
  // throw new Error('DB failed check...')

  const contacts = JSON.parse(dataFromDB);
  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    return next(new AppError(404, "Contact does not exist..."));
  }

  req.contact = contact;

  next();
});

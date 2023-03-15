const fs = require("fs").promises;
const uuid = require("uuid").v4;

const {
  catchAsync,
  AppError,
  createContactDataValidator,
} = require("../utils");

exports.addContact = catchAsync(async (req, res, next) => {
  const { error, value } = createContactDataValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { name, email, phone } = value;

  const dataFromDB = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(dataFromDB);

  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  res.status(201).json({
    contact: newContact,
  });
});

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  res.status(200).json({
    contacts,
  });
});

exports.getContactById = async (req, res) => {
  // const { id } = req.params;

  // const dataFromDB = await fs.readFile("./models/contacts.json");
  // const contacts = JSON.parse(dataFromDB);
  // const contact = contacts.find((item) => item.id === id);

  const { contact } = req;

  res.status(200).json({
    contact,
  });
};

exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  const updatedListContacts = contacts.filter((item) => item.id !== id);

  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(updatedListContacts)
  );

  res.sendStatus(204);
});

exports.updateContactById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  const contactToUpdate = contacts.find((item) => item.id === id);

  if (name) {
    contactToUpdate.name = name;
  }

  if (email) {
    contactToUpdate.email = email;
  }

  if (phone) {
    contactToUpdate.phone = phone;
  }

  const contactIndex = contacts.findIndex((item) => item.id === id);

  contacts[contactIndex] = contactToUpdate;

  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  res.status(200).json({
    contactToUpdate,
  });
});

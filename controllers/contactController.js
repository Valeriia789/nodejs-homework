const { catchAsync } = require("../utils");
const Contact = require("../models/contactModel");

exports.addContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  newContact.password = undefined;

  res.status(201).json({
    contact: newContact,
  });
});

exports.listContacts = catchAsync(async (req, res) => {
  // приклад:
  // const contacts = await Contact.find().select('name email phone')
  // const contacts = await Contact.find().select('+password')
  // const contacts = await Contact.find({"name": "Alina"}).select("-__v");
  const contacts = await Contact.find().select("-__v");

  res.status(200).json({
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id).select("+password");

  // // перевіряємо пароль:
  // const passwordIsValid = await contact.checkPassword(
  //   "Pass1234",
  //   contact.password
  // );
  // console.log(passwordIsValid);

  res.status(200).json({
    contact,
  });
});

exports.updateContactById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  // повертає старий об'єкт, але в базі записується оновлений
  // const updatedContact = await Contact.findByIdAndUpdate(id, { name: req.body.name })

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  res.status(200).json({
    updatedContact,
  });
});

exports.updateStatusContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.status(200).json({
    updatedContact,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});

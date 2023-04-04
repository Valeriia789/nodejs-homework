const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");

const addContact = catchAsync(async (req, res) => {
  const { name, email, phone, favorite, desk } = req.body;

  const newContactData = {
    owner: req.user,
    name,
    email,
    phone,
    favorite,
    desk,
  };

  const newContact = await Contact.create(newContactData);

  res.status(201).json({
    contact: newContact,
  });
});

module.exports = addContact;

const Contact = require('../../models/contactModel')
const { catchAsync } = require("../../utils");

const contacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find().populate("owner");

  res.status(200).render("contacts", {
    title: "Contacts list",
    contacts,
    active: "contacts",
  });
});

module.exports = contacts;

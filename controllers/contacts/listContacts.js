const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");
const { USER } = require("../../constants/userRolesEnum");

const listContacts = catchAsync(async (req, res) => {
  const { limit, page, sort, order, search } = req.query;

  // define search options ===================
  // $or  - якщо одна з умов
  // $and - щоб обидві умови виконувались одночасно
  const findOptions = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  if (search && req.user.role === USER) {
    findOptions.$or.forEach((option) => {
      option.owner = req.user;
    });
  }

  if (!search && req.user.role === USER) {
    findOptions.owner = req.user;
  }

  // ініціалізуємо database query ===================
  const contactsQuery = Contact.find(findOptions);

  // sorting ======================
  // order = 'ASC' | 'DESC'
  // .sort('-name') | .sort('email')
  // const contacts = await Contact.find().sort(`${order === 'DESC' ? '-' : ''}${sort}`)

  contactsQuery.sort(`${order === "DESC" ? "-" : ""}${sort}`);

  // pagination ===============
  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  // витягуємо всі контакти:
  // const contacts = await Contact.find().skip(skip).limit(paginationLimit);

  // populate знадобиться, коли будемо витягувати контакти по id
  // const contacts = await Contact.find().populate('owner')

  // щоб в респонсі не показувати v і owner:
  // const contacts = await Contact.find().select("-owner -__v");

  contactsQuery.skip(skip).limit(paginationLimit);

  // const contacts = await Contact.find(findOptions);
  const contacts = await contactsQuery;
  const total = await Contact.count(findOptions);

  res.status(200).json({
    shown: contacts.length,
    total,
    contacts,
  });
});

module.exports = listContacts;


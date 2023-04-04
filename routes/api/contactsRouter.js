const { Router } = require("express");
const userRolesEnum = require("../../constants/userRolesEnum");
const { protect, allowForRoles } = require("../../middlewares/users");

const {
  checkContactId,
  checkContactData,
} = require("../../middlewares/contacts");

const {
  addContact,
  listContacts,
  getContactById,
  updateContactById,
  updateContactStatus,
  removeContact,
} = require("../../controllers/contacts");

const router = Router();

// the routes below are allowed only for logged in users
router.use(protect);

// the routes below are for specific user roles only
router.use(
  allowForRoles(
    userRolesEnum.USER,
    userRolesEnum.ADMIN,
    userRolesEnum.MODERATOR
  )
);

router.route("/").post(checkContactData, addContact).get(listContacts);

router.use("/:id", checkContactId);

router
  .route("/:id")
  .get(getContactById)
  .put(checkContactData, updateContactById)
  .delete(removeContact);

router.use("/:id/favorite", checkContactId);

router.route("/:id/favorite").patch(checkContactData, updateContactStatus);

module.exports = router;

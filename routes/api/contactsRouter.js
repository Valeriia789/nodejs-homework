const { Router } = require("express");

const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContactById,
} = require("../../controllers/contactController");

const { checkContactId } = require("../../middlewares/contactMiddleware");

const router = Router();

router.post("/", addContact);
router.get("/", listContacts);
router.get("/:id", checkContactId, getContactById);
router.delete("/:id", checkContactId, removeContact);
router.put("/:id", checkContactId, updateContactById);

// // альтернативний синтаксис, як користуватись роутами
// router
//   .route("/")
//   .post(addContact)
//   .get(listContacts);

// router.use("/:id", checkContactId);

// router
//   .route("/:id")
//   .get(getContactById)
//   .delete(removeContact)
//   .put(updateContactById);

module.exports = router;
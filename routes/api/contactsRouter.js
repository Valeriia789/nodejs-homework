const { Router } = require("express");

const {
  addContact,
  listContacts,
  getContactById,
  updateContactById,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contactController");

const {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
  checkUpdateStatusContact,
} = require("../../middlewares/contactMiddleware");

const router = Router();

router
  .route("/")
  .post(checkCreateContactData, addContact)
  .get(listContacts);

router.use("/:id", checkContactId);

router
  .route("/:id")
  .get(getContactById)
  .put(checkUpdateContactData, updateContactById)
  .delete(removeContact);

router.use("/:id/favorite", checkContactId);

router
  .route("/:id/favorite")
  .patch(checkUpdateStatusContact, updateStatusContact);

// // альтернативний синтаксис, як користуватись роутами

// router.post("/", checkCreateContactData, addContact);
// router.get("/", listContacts);
// router.get("/:id", checkContactId, getContactById);
// router.delete("/:id", checkContactId, removeContact);
// router.put("/:id", checkContactId, updateContactById);

module.exports = router;

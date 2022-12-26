const router = require("express").Router();
const {
  getUserProfile,
  updateProfile,
  deleteProfile,
} = require("../../controllers/users");

router.get("/:id", getUserProfile);
router.patch("/update", updateProfile);
router.delete("/delete", deleteProfile);

module.exports = router;

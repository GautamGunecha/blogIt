const router = require("express").Router();
const { auth } = require("../../middlewares/auth");

const {
  getUserProfile,
  updateProfile,
  deleteProfile,
} = require("../../controllers/users");

router.get("/:id", auth, getUserProfile);
router.patch("/update", auth, updateProfile);
router.delete("/delete", auth, deleteProfile);

module.exports = router;

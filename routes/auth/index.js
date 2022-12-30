const router = require("express").Router();
const {
  login,
  register,
  verification,
  generateAccessToken,
  logout,
} = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");

router.post("/register", register);
router.post("/verification", verification);
router.post("/login", login);
router.post("/refresh-token", generateAccessToken);
router.get("/logout", auth, logout);

module.exports = router;

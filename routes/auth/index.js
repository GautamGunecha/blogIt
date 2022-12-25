const router = require("express").Router();
const { login, register, verification } = require("../../controllers/auth");

router.post("/register", register);
router.post("/register", verification);
router.post("/login", login);

module.exports = router;

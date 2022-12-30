const router = require("express").Router();
const { login, register, verification } = require("../../controllers/auth");

router.post("/register", register);
router.post("/verification", verification);
router.post("/login", login);

module.exports = router;

const jwt = require("jsonwebtoken");
const Users = require("../../models/users/userModel");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id }).lean();

    if (!user.isAdmin)
      return res.status(500).json({ msg: "Admin access denied." });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { auth, authAdmin };

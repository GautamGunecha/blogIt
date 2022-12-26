const Users = require("../../models/users/userModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (_.isEmpty(req.body)) throw new Error("Enter required data.");

    if (!firstName || !lastName || !email || !password)
      throw new Error("Enter required fields.");

    const user = await Users.findOne({ email }).lean();
    if (user) throw new Error("User already exists.");

    const salt = await bcrypt.genSalt(13);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashPassword,
    };

    return res.status(200).json({ msg: "Registration Success." });
  } catch (error) {
    next(error);
  }
};

const verification = async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (_.isEmpty(req.body)) throw new Error("Enter required data.");

    if (!email || !password) throw new Error("Enter required fields.");

    const user = await Users.findOne({ email }).lean();
    if (!user) throw new Error("User not found.");
  } catch (error) {
    next(error);
  }
};

const loginWithPhoneNumber = async (req, res, next) => {
  try {
    const { countryCode, phoneNumber } = req.body;
    if (_.isEmpty(req.body)) throw new Error("Enter required data.");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verification, login, loginWithPhoneNumber };

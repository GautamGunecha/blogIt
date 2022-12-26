const Users = require("../../models/users/userModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const { validateEmail, validatePassword } = require("../../config/validations");
const {
  userActivationToken,
  userAccessToken,
  userRefreshToken,
} = require("../../services/jwt");

const { CLIENT_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (_.isEmpty(req.body)) throw new Error("Enter required data.");

    if (!firstName || !lastName || !email || !password)
      throw new Error("Enter required fields.");

    const verifyPassword = validatePassword(password);
    if (!verifyPassword.success) throw new Error(verifyPassword?.msg);

    const verifyEmail = validateEmail(email);
    if (!verifyEmail) throw new Error("Invalid Email.");

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

    const activationToken = userActivationToken(newUser);
    const url = `${CLIENT_URL}/user/activate/${activationToken}`;

    return res.status(201).json({ msg: "Registration Success." });
  } catch (error) {
    error.statusCode = 400;
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

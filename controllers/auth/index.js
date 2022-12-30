const Users = require("../../models/users/userModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const { validateEmail, validatePassword } = require("../../config/validations");
const {
  userActivationToken,
  userAccessToken,
  userRefreshToken,
  verifyUserAccessToken,
  verifyUserRefreshToken,
} = require("../../services/jwt");
const sendEmail = require("../../services/mails");

const { CLIENT_URL } = process.env;

/**
 * @register Register new user.
 * @api /register.
 * @reqbody type object {firstName, lastName, email, password}
 * verify the user credentials and process the data according.
 * @verifyPassword - validate entered password by user.
 * @verifyEmail - validate entered email by user.
 * checks if users already exists or not.
 * encrypt password entered by the user.
 * @newUser create new object of req.body and generate activation token.
 * @activationToken generates jwt token which contains entered user details.
 * @url generates url based on newUser object.
 * @returns status - 201 and msg: Registration Success.
 */

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

    sendEmail(email, url, "Click Here To Verify Email");

    return res.status(201).json({ msg: "Registration Success." });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

/**
 * @verification verify the new user credentials using jwt.
 * @api /verification
 * @reqbody type object - { activationToken }
 * decrypt activationToken and get users credentials.
 * checks if user account has already created or not.
 * create new users.
 */

const verification = async (req, res) => {
  try {
    const { activationToken } = req.body;
    const user = verifyUserAccessToken(activationToken);
    if (_.isEmpty(user)) throw new Error("Invalid token request.");

    const { firstName, lastName, email, password } = user;
    const check = await Users.findOne({ email });
    if (check) throw new Error("Profile already exists.");

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({ msg: "Account has been activated." });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

/**
 * @login allows users to login into web application
 * @api /login
 * @reqbody type object - {email, password}
 * checks if user details are correct or not.
 * decrypt entered password with user password.
 * verify password match.
 */

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (_.isEmpty(req.body)) throw new Error("Enter required data.");

    if (!email || !password) throw new Error("Enter required fields.");

    const user = await Users.findOne({ email }).lean();
    if (!user) throw new Error("User not found.");

    const checkPassword = await bcrypt.compare(password, user?.password);
    if (!checkPassword) throw new Error("Incorrect Password.");

    const refreshToken = userRefreshToken({ id: user?._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ msg: "Login success!" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

/**
 * @generateAccessToken generates accessToken.
 * @api /
 * gets refreshToken from cookie
 * verify refreshToken and generates accessToken
 * @returns accessToken
 */

const generateAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) throw new Error("Please login now!");

    const verifyRefreshToken = verifyUserRefreshToken(refreshToken);
    if (!verifyRefreshToken) throw new Error("Invalid token request.");

    const accessToken = userAccessToken({ id: verifyRefreshToken.id });
    return res.status(200).json({ accessToken });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

/**
 * @loginWithPhoneNumber allows user to directly login with their phone number.
 * verify if phone number exists or not.
 * generates otp and send to registered mobile number.
 */

const loginWithPhoneNumber = async (req, res, next) => {
  try {
    const { countryCode, phoneNumber } = req.body;
    if (_.isEmpty(req.body)) throw new Error("Enter required data.");

    const user = await Users.findOne({ phoneNumber });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

module.exports = {
  register,
  verification,
  login,
  loginWithPhoneNumber,
  generateAccessToken,
};

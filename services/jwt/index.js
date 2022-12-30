const jwt = require("jsonwebtoken");

const userActivationToken = (payload) => {
  return jwt.sign(payload, process.env.USER_ACTIVATION_TOKEN, {
    expiresIn: "5m",
  });
};

const userAccessToken = (payload) => {
  return jwt.sign(payload, process.env.USER_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const userRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.USER_REFRESH_TOKEN, {
    expiresIn: "15m",
  });
};

const verifyUserActivationToken = (token) => {
  return jwt.verify(token, process.env.USER_ACTIVATION_TOKEN);
};

const verifyUserAccessToken = (token) => {
  return jwt.verify(token, process.env.USER_ACTIVATION_TOKEN);
};

const verifyUserRefreshToken = (token) => {
  return jwt.verify(token, process.env.USER_REFRESH_TOKEN);
};

module.exports = {
  userActivationToken,
  userAccessToken,
  userRefreshToken,
  verifyUserActivationToken,
  verifyUserAccessToken,
  verifyUserRefreshToken,
};

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

module.exports = {
  userActivationToken,
  userAccessToken,
  userRefreshToken,
};

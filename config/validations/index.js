const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};

const validatePassword = (password) => {
  const validate = {};
  const minLength = 6;
  const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (password.length < minLength) {
    validate.success = false;
    validate.msg = "Password is less than 6 chars.";
    return validate;
  }

  if (!regex.test(password)) {
    validate.success = false;
    validate.msg =
      "Password should contain atleast one number and one special character";
    return validate;
  }

  validate.success = true;
  validate.msg = "Password is valid";
  return validate;
};

module.exports = { validateEmail, validatePassword };

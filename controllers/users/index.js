const Users = require("../../models/users/userModel");

const getUserProfile = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id).select("-password").lean();
    if (!user) throw new Error("User not found.");

    return res.status(200).json(user);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });
    if (!user) throw new Error("User not found.");
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile, deleteProfile, getUserProfile };

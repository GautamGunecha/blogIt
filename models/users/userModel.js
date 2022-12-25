const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoDB } = require("../../config/db");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      min: 3,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      required: true,
    },
    email: {
      type: String,
      max: 150,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    auth: {
      type: String,
      enum: ["google", "email"],
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoDB.model("User", userSchema);

module.exports = Users;

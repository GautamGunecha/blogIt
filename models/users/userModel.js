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
      max: 200,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    countryCode: {
      type: String,
      default: "+91",
    },
    avatar: {
      type: String,
      default: "",
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
    enabledPayment: {
      type: Boolean,
      default: false,
    },
    paymentConfig: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoDB.model("User", userSchema);

module.exports = Users;

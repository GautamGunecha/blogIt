const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoDB } = require("../../config/db");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 30,
    },
    paragraph: {
      type: String,
      required: true,
    },
    createdBy: {},
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "private", "public"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

const postsModel = mongoDB.model("Posts", postSchema);
module.exports = postsModel;

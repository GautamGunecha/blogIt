const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { mongoDB } = require("../../config/db");

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    subComment: [
      {
        text: {
          type: String,
        },
        by: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const comment = mongoDB.model("Comments", commentSchema);
module.exports = comment;

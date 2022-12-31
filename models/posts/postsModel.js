const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoDB } = require("../../config/db");

const postSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 30,
    },
    text: [
      {
        subheader: {
          type: String,
        },
        image: {
          type: String,
        },
        paragraphs: [
          {
            type: String,
          },
        ],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
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
    views: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    tags: {
      type: String,
      enum: [
        "finance",
        "technical",
        "lifestyle",
        "business",
        "motivational",
        "spiritual",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postsModel = mongoDB.model("Posts", postSchema);
module.exports = postsModel;

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Please add Book Image URL"],
    },
    title: {
      type: String,
      required: [true, "Please add Book title"],
    },
    author: {
      type: String,
      required: [true, "Please add Book Author name"],
    },
    price: {
      type: Number,
      required: [true, "Please add Book Price"],
    },
    desc: {
      type: String,
      required: [true, "Please add Book Description"],
    },
    language: {
      type: String,
      required: [true, "Please add Book Language"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);

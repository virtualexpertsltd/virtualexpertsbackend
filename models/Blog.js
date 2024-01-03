const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    img: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cardDescription: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: true,
    },
    writerName: {
      type: String,
      required: true,
    },
  }, {
  timestamps: true
}
);

module.exports = mongoose.model("Blog", BlogSchema);

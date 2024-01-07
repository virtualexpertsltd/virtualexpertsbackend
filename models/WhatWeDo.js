const mongoose = require("mongoose");

const WhatWeDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subDescription_1: {
      type: String,
      required: true,
    },
    subDescription_2: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("WhatWeDo", WhatWeDoSchema);

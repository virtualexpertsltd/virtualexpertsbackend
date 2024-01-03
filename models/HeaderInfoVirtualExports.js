const mongoose = require("mongoose");

const HeaderInfoVirtualExportsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description_part_1: {
      type: String,
      required: true,
    },
    description_part_2: {
      type: String,
      required: true,
    },

  },
  { timeStamps: true }
);

module.exports = mongoose.model("headerInfoVirtualExports", HeaderInfoVirtualExportsSchema);

const mongoose = require('mongoose');

const LeadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    productlink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);
module.exports = mongoose.model('lead', LeadsSchema);
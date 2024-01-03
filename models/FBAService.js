const mongoose = require('mongoose');

const FBAServiceSchema = new mongoose.Schema(
  {
    sl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);
module.exports = mongoose.model('FBAService', FBAServiceSchema);
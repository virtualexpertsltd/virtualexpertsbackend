const mongoose = require('mongoose');

const FbaDesc1Schema = new mongoose.Schema(
    {
        discription: {
            type: String,
            required: true,
        },
    },
    { timeStamps: true }
);
module.exports = mongoose.model('FbaD1', FbaDesc1Schema);
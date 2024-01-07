const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require("dotenv").config();

// database connection
const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName:"VirtualExperts"
    })
        .then(() => {
        console.log(`db connected succesfully`.white.bgCyan.bold)
        }).catch((err) => {
        console.log(err.message);
    })
}

module.exports = dbConnect;
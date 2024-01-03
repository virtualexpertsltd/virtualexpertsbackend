const Admin = require("../models/AdminLogin");

exports.findUserByUsername = async (username) => {
  return await Admin.findOne({ username });
};

const user = require("../model/Model.js");

const createNewUser = (newUser) => {
  const userToInsert = {
    ...newUser,
    createdAt: new Date().toLocaleDateString("en-US", { timezone: "UTC" }),
    updatedAt: new Date().toLocaleDateString("en-US", { timezone: "UTC" }),
  };
  try {
    const createdUser = user.create(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const userLoginService = (email) => {
  var users = user.findOne({ email });
  return true;
};

module.exports = {
  createNewUser,
  userLoginService,
};

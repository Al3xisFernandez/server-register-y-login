
const user = require("../model/Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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

const userLoginService = async ( email, password ) => {
  const Users = await user.findOne({ email });
  if (!Users) throw new Error("User Not Found");
  const result = await bcrypt.compare(password, Users.password);
  if (!result) throw new Error("Invalid Password");
  return jwt.sign({ email: Users.email }, JWT_SECRET, { expiresIn: "1h" });
};


const userDataService = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const useremail = decoded.email;
    const data = await user.findOne({ email: useremail });
    if (!data) {
      return res.json({ status: "error", data: "User Not Found" });
    }
    res.send({ status: "ok", data });
  } catch (err) {
    return res.json({ status: "error", data: "Token Expired" });
  }
};

module.exports = {
  createNewUser,
  userLoginService,
  userDataService,
};

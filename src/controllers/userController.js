const userService = require("../services/userServices");
const user = require("../model/Model.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const createNewUser = (req, res) => {
  const { body } = req;
  if (!body.fname || !body.lname || !body.email || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'fname', 'lname', 'email', 'password' ",
      },
    });
  }
  const newUser = {
    fname: body.fname,
    lname: body.lname,
    email: body.email,
    password: body.password,
  };
  try {
    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  var user = userService.userLoginService(email, password);
  if (user) {
    res.status(200).send({ status: "OK", data: user });
  } else {
    res
      .status(400)
      .send({ status: "FAILED", data: { error: "Invalid Credentials" } });
  }
};

const userDataController = async (req, res) => {
  const { token } = req.body;

  try {
    const users = await userService.userDataService(token);
    if (users === "Token expired") {
      return res.json({ status: "error", data: "token expired" });
    }
    const data = await userService.getUserDataByEmail(user.email);
    res.send({ status: "ok", data });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
};

module.exports = {
  createNewUser,
  userLogin,
  userDataController
};

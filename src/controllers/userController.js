const userService = require("../services/userServices");
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
  const {email, password} = req.body;
  var user = userService.userLoginService(email, password)
  if (user) {
    res.status(200).send({ status: "OK", data: user });
  } else {
    res.status(400).send({ status: "FAILED", data: { error: "Invalid Credentials" } });
  }}

module.exports = {
  createNewUser,
  userLogin
};

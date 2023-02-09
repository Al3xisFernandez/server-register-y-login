const express = require("express");
const bodyParser = require("body-parser");
const v1UserRouter = require("./src/v1/routes/userRoutes");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use("/api/v1/users", v1UserRouter);
app.use(cors());

module.exports = app;

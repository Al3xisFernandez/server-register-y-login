const mongoose = require("mongoose");
const url = "mongodb+srv://alexis:alexis50@cluster0.k6l1zwl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("bd conectada");
});

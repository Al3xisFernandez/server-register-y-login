require("./src/database/db.js");
const app = require("./app")
const main = () => {
  app.listen(5000, () => console.log("servidor conectado"));
};
main();
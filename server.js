const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./index.js");

const connectionStr = process.env.DATABASE;
mongoose
  .connect(connectionStr)
  .then((connection) => console.log("connect to database"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, "127.0.0.1", () => {
  console.log("start server");
});

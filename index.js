const express = require("express");
const driverRouter = require("./routes/driverRouter.js");
const routeRouter = require("./routes/routeRouter.js");
const scheduleRouter = require("./routes/schduleRouter.js");
const app = express();

app.use(express.json());
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/routes", routeRouter);
app.use("/api/v1/schedules", scheduleRouter);

app.get("/", (req, res, next) => {
  res.send("hello");
});

module.exports = app;

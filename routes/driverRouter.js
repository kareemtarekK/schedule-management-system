const express = require("express");
const {
  createDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} = require("./../controllers/driverController.js");
const driverRouter = express.Router();
driverRouter.route("/").post(createDriver).get(getAllDrivers);

driverRouter
  .route("/:driverId")
  .get(getDriver)
  .patch(updateDriver)
  .delete(deleteDriver);

module.exports = driverRouter;

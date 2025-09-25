const express = require("express");
const {
  createSchedule,
  getAllSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("./../controllers/scheduleController.js");
const scheduleRouter = express.Router();
scheduleRouter.route("/").post(createSchedule).get(getAllSchedules);

scheduleRouter
  .route("/:scheduleId")
  .get(getSchedule)
  .patch(updateSchedule)
  .delete(deleteSchedule);

module.exports = scheduleRouter;

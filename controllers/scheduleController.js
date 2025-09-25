const Schedule = require("./../models/schedule.js");
const Driver = require("./../models/driver.js");
exports.createSchedule = async (req, res, next) => {
  const { driver_id, route_id, startTime, endTime } = req.body;
  const driver = await Driver.findById(driver_id);
  if (!driver || driver.status !== "active") {
    return res.status(400).json({
      status: "fail",
      message: "driver not avilable",
    });
  }

  const conflict = await Schedule.findOne({
    driver_id,
    $or: [{ startTime: { $lt: endTime } }, { endTime: { $gt: startTime } }],
  });
  if (conflict) {
    return res.status(400).json({
      status: "fail",
      message: "driver already scheduled at this time",
    });
  }
  const schedule = await Schedule.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      schedule,
    },
  });
};

exports.getAllSchedules = async (req, res, next) => {
  const schedules = await Schedule.find();
  res.status(200).json({
    status: "success",
    data: {
      schedules,
    },
  });
};

exports.getSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule)
    return res.status(404).json({
      status: "fail",
      message: "no schedule with that id",
    });
  res.status(200).json({
    status: "success",
    data: {
      schedule,
    },
  });
};

exports.updateSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule)
    return res.status(404).json({
      status: "fail",
      message: "no schedule with that id",
    });
  const updatedSchedule = await Route.findByIdAndUpdate(scheduleId, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedSchedule,
    },
  });
};

exports.deleteSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule)
    return res.status(404).json({
      status: "fail",
      message: "no schedule with that id",
    });
  await Schedule.findByIdAndDelete(scheduleId);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

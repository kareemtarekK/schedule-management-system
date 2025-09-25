const Driver = require("./../models/driver.js");
exports.createDriver = async (req, res, next) => {
  const driver = await Driver.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      driver,
    },
  });
};

exports.getAllDrivers = async (req, res, next) => {
  let query = Driver.find();
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const drivers = await query.skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    data: {
      drivers,
    },
  });
};

exports.getDriver = async (req, res, next) => {
  const { driverId } = req.params;
  const driver = await Driver.findById(driverId);
  if (!driver)
    return res.status(404).json({
      status: "fail",
      message: "no driver with that id",
    });
  res.status(200).json({
    status: "success",
    data: {
      driver,
    },
  });
};

exports.updateDriver = async (req, res, next) => {
  const { driverId } = req.params;
  const driver = await Driver.findById(driverId);
  if (!driver)
    return res.status(404).json({
      status: "fail",
      message: "no driver with that id",
    });
  const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedDriver,
    },
  });
};

exports.deleteDriver = async (req, res, next) => {
  const { driverId } = req.params;
  const driver = await Driver.findById(driverId);
  if (!driver)
    return res.status(404).json({
      status: "fail",
      message: "no driver with that id",
    });
  await Driver.findByIdAndDelete(driverId);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

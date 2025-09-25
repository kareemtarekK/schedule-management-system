const Route = require("./../models/route.js");
exports.createRoute = async (req, res, next) => {
  const route = await Route.create(req.body);
  console.log(route);
  res.status(201).json({
    status: "success",
    data: {
      route,
    },
  });
};

exports.getAllRoutes = async (req, res, next) => {
  const routes = await Route.find();
  res.status(200).json({
    status: "success",
    data: {
      routes,
    },
  });
};

exports.getRoute = async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findById(routeId);
  if (!route)
    return res.status(404).json({
      status: "fail",
      message: "no route with that id",
    });
  res.status(200).json({
    status: "success",
    data: {
      route,
    },
  });
};

exports.updateRoute = async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findById(routeId);
  if (!route)
    return res.status(404).json({
      status: "fail",
      message: "no route with that id",
    });
  const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedRoute,
    },
  });
};

exports.deleteRoute = async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findById(routeId);
  if (!route)
    return res.status(404).json({
      status: "fail",
      message: "no route with that id",
    });
  await Route.findByIdAndDelete(routeId);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

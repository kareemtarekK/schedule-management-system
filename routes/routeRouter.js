const express = require("express");
const {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
} = require("./../controllers/routeController.js");
const routeRouter = express.Router();
routeRouter
  .route("/")
  .post((req, res, next) => {
    console.log(50000000);
    next();
  }, createRoute)
  .get(getAllRoutes);

routeRouter
  .route("/:routeId")
  .get(getRoute)
  .patch(updateRoute)
  .delete(deleteRoute);

module.exports = routeRouter;

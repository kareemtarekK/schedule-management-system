const mongoose = require("mongoose");
const routeSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: [true, "enter route origin"],
    },
    destination: {
      type: String,
      required: [true, "enter route destination"],
    },
    stops: [String],
    durationInMinutes: Number,
    distanceKM: Number,
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;

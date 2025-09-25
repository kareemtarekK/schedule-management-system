const mongoose = require("mongoose");
const Route = require("./route.js");
const scheduleSchema = new mongoose.Schema(
  {
    driver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "enter driver id"],
    },
    route_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: [true, "enter route id"],
    },
    startTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

scheduleSchema.pre("save", async function (next) {
  const id = this.route_id;
  console.log(id);
  const route = await Route.findById(this.route_id);
  console.log(route.durationInMinutes);
  this.endTime = new Date(
    this.startTime.getTime() + route.durationInMinutes * 60 * 1000
  );
  next();
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;

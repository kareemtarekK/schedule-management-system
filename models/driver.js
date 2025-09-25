const validator = require("validator");
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "enter driver name"],
      trim: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (val) {
          return validator.isMobilePhone(val, "any");
        },
        message: "enter valid phone number",
      },
    },
    licenseNumber: String,
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;

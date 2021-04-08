const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    bus_type: {
      type: Schema.Types.ObjectId,
      ref: "BusType",
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    recurring: [
      {
        type: String,
        required: true,
      },
    ],
    ticket: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);

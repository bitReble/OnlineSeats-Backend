const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    passenger: {
      type: Schema.Types.ObjectId,
      ref: "Passenger",
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    seat_number: {
      type: Number,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    locked_time: {
      type: Date,
    },
    locked_token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);

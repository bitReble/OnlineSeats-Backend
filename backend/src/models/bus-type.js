const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const busTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number_of_seats: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    right: {
      type: Number,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusType", busTypeSchema);

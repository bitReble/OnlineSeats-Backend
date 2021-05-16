const mongoose = require("mongoose");
const { toHash } = require("../utils/password");

const Schema = mongoose.Schema;

const passengerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

passengerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  next();
});

module.exports = mongoose.model("Passenger", passengerSchema);

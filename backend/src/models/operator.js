const mongoose = require("mongoose");
const { toHash } = require("../utils/password");

const Schema = mongoose.Schema;

const operatorSchema = new Schema(
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
    is_approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

operatorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  next();
});

module.exports = mongoose.model("Operator", operatorSchema);

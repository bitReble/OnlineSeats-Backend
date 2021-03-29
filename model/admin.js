const mongoose = require("mongoose");
const { toHash } = require("../util/password");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
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

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);

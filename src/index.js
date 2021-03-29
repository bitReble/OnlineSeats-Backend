const mongoose = require("mongoose");
const app = require("./app");
const { defineAdmin } = require("./util/define-admin");

// port may very according to the server we are deploying
const PORT = process.env.PORT || 3000;

if (!process.env.mongodb_url) {
  throw new Error("mongodb_url must be defined");
}
if (!process.env.admin_email) {
  throw new Error("admin_email must be defined");
}
if (!process.env.admin_password) {
  throw new Error("admin_password must be defined");
}
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}

// connecting mongodb
mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (_) => {
    // defining admin
    await defineAdmin();
    // let the app listen on the port
    app.listen(PORT, () => {
      console.log("Server is up and running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

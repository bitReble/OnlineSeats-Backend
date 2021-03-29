const mongoose = require("mongoose");
const app = require("./app");
const { defineAdmin } = require("./util/define-admin");

// port may very according to the server we are deploying
const PORT = process.env.PORT || 3000;

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

// importing modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing user defined modules
const authRoutes = require("./routes/auth");

// creating express app
const app = express();

// allowing client to hit the backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// letting express use bodyParser to read request body as application/json
app.use(bodyParser.json());

// using routers to handle request
app.use("/auth", authRoutes);

// port may very according to the server we are deploying
const PORT = process.env.PORT || 4000;

// connecting mongodb
mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    // let the app listen on the port
    app.listen(PORT, () => {
      console.log("Server is up and running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

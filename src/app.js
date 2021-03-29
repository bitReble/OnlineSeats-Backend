require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");

// importing user defined route modules
const authRoutes = require("./routes/auth");
const { errorHandler } = require("@coders2authority/tik-common");

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

app.use(errorHandler);

module.exports = app;

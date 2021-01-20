// importing modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// importing user defined route modules
const authRoutes = require("./routes/auth");

// importing user defined schemas
const Admin = require("./model/admin");

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

// wildcard error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const messages = error.messages;
  const data = error.data;
  res.status(status).json({ messages: messages, data: data });
});

// connecting mongodb
mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (_) => {
    // creating system admin
    const isAdminExist = await Admin.exists({ email: process.env.admin_email });
    if (!isAdminExist) {
      const hash = await bcrypt.hash(process.env.admin_password, 12);

      const admin = new Admin({
        email: process.env.admin_email,
        password: hash,
      });

      await admin.save();
    }

    // let the app listen on the port
    app.listen(PORT, () => {
      console.log("Server is up and running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

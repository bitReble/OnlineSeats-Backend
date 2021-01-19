// importing modules
const express = require("express");

// importing user defined modules
const authController = require("../controllers/auth");

// initializing router
const router = express.Router();

// POST /auth/signup
router.post("/signup", authController.signup);

// exporting the router
module.exports = router;

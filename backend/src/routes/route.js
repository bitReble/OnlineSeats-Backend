// importing modules
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require("@coders2authority/bus-common");
const express = require("express");
const { body } = require("express-validator");

// importing user defined controller modules
const routeController = require("../controllers/route");
const { allowOperator } = require("../middlewares/access-control");

// importing user defined schema modules

// initializing router
const router = express.Router();

// POST /bus/create-route
router.post(
  "/create-route",
  currentUser,
  requireAuth,
  allowOperator,
  [body("path").isArray({ min: 2 }).withMessage("path should be an array")],
  validateRequest,
  routeController.createRoute
);

// exporting the router
module.exports = router;

// importing modules
const { currentUser, requireAuth } = require("@coders2authority/bus-common");
const express = require("express");
const { body } = require("express-validator");

// importing user defined controller modules
const routeController = require("../controllers/route");
const { allowOperator } = require("../middlewares/access-control");

// importing user defined schema modules

// initializing router
const router = express.Router();

// POST /bus/create-bus-type
router.post(
  "/create-route",
  currentUser,
  requireAuth,
  allowOperator,
  [
    body("from").not().isEmpty().withMessage("from should be provided"),
    body("to").isInt({ gt: 25 }).withMessage("to should be provided"),
    body("path").isArray({ min: 0 }).withMessage("path should be an array"),
  ],
  routeController.createRoute
);

// exporting the router
module.exports = router;

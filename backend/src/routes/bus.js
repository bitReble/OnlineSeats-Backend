// importing modules
const {
  validateRequest,
  currentUser,
  requireAuth,
} = require("@coders2authority/bus-common");
const express = require("express");
const { body } = require("express-validator");

// importing user defined controller modules
const busController = require("../controllers/bus");
const { allowOperator } = require("../middlewares/access-control");

// importing user defined schema modules

// initializing router
const router = express.Router();

// POST /bus/create-bus-type
router.post(
  "/create-bus-type",
  [
    body("name")
      .isLength({ min: 2, max: 20 })
      .withMessage("name should be provided"),
    body("number_of_seats")
      .isInt({ gt: 25 })
      .withMessage("number_of_seats should be more than 25"),
    body("left")
      .isInt({ gt: 0 })
      .withMessage("left(number of left seats) should be provided"),
    body("right")
      .isInt({ gt: 0 })
      .withMessage("right(number of right seats) should be provided"),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  allowOperator,
  busController.createBusType
);

// PUT /bus/update-bus-type
router.put(
  "/update-bus-type",
  [body("bus_id").notEmpty().withMessage("bus_id should be provided")],
  validateRequest,
  currentUser,
  requireAuth,
  allowOperator,
  busController.updateBusType
);

// DELETE /bus/delete-bus-type
router.delete(
  "/delete-bus-type",
  [body("bus_id").notEmpty().withMessage("bus_id should be provided")],
  validateRequest,
  currentUser,
  requireAuth,
  allowOperator,
  busController.deleteBusType
);

// exporting the router
module.exports = router;

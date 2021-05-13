// importing modules
const { currentUser, requireAuth } = require("@coders2authority/bus-common");
const express = require("express");
const { body } = require("express-validator");

// importing user defined controller modules
const ticketController = require("../controllers/ticket");

// importing user defined schema modules

// initializing router
const router = express.Router();

// POST /ticket/lock-ticket
router.post(
  "/lock-ticket",
  currentUser,
  requireAuth,
  [body("ticket_id").isEmpty().withMessage("ticket_id should be provided")],
  ticketController.lockTicket
);

// POST /ticket/reserve-ticket
router.post(
  "/reserve-ticket",
  currentUser,
  requireAuth,
  [
    body("ticket_id").isEmpty().withMessage("ticket_id should be provided"),
    body("locked_token")
      .isEmpty()
      .withMessage("locked_token should be provided"),
  ],
  ticketController.reserveTicket
);

// exporting the router
module.exports = router;

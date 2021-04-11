const { randomBytes } = require("crypto");
const moment = require("moment");
const {
  NotFountError,
  NotAuthorizedError,
} = require("@coders2authority/bus-common");

// importing user defined schema modules
const Ticket = require("../models/ticket");

exports.lockTicket = async (req, res, next) => {
  const { ticket_id } = req.body;
  const ticket = await Ticket.findById(ticket_id);
  if (!ticket) {
    throw new NotFountError();
  } else if (ticket.passenger) {
    throw new NotAuthorizedError("ticket already reseved");
  }

  const lockedTill = new Date(ticket.locked_till);
  const now = new Date();

  if (lockedTill > now) {
    throw new NotAuthorizedError("ticket waiting for payment");
  }
  ticket.locked_till = moment().add(15, "minutes");
  ticket.locked_token = randomBytes(4).toString("hex");
  await ticket.save();
  return res.status(201).send(ticket);
};

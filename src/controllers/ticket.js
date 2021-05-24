const { randomBytes } = require("crypto");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;

const {
  NotFountError,
  NotAuthorizedError,
  BadRequestError,
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

exports.reserveTicket = async (req, res, next) => {
  // const { ticket_id, locked_token } = req.body;
  const { ticket_id, token } = req.body;

  const ticket = await Ticket.findById(ticket_id);
  if (!ticket) {
    throw new NotFountError();
  } else if (ticket.passenger) {
    throw new NotAuthorizedError("ticket already reseved");
  }

  // if (ticket.locked_token != locked_token) {
  //   throw new NotAuthorizedError("invalid token");
  // }

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const idempotency_key = uuid();
  try {
    const charge = await stripe.charges.create(
      {
        amount: ticket.price * 100,
        currency: "lkr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${ticket._id}`,
      },
      {
        idempotencyKey: idempotency_key,
      }
    );
  } catch (err) {
    throw new BadRequestError(
      "payment was rejected, please try different card!"
    );
  }

  ticket.passenger = req.currentUser.encryptedId;
  await ticket.save();

  return res.status(201).send(ticket);
};

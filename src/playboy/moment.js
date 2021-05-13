const moment = require("moment");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Ticket = require("../models/ticket");

const play = async () => {
  let mongo;

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const seat_number = 20;

  const ticket = new Ticket({
    schedule: mongoose.Types.ObjectId(),
    seat_number,
    date: new Date(),
    price: 20,
    locked_time: new Date(),
  });

  await ticket.save();
  if (!ticket.locked_time) {
    return;
  }
  const lockedTime = moment(ticket.locked_time);
  if (lockedTime > new Date()) {
    console.log("Faileed");
  }
};

play();

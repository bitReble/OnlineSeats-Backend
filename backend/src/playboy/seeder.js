const fs = require("fs");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Ticket = require("../models/ticket");
const BusType = require("../models/bus-type");
const Route = require("../models/route");
const Schedule = require("../models/schedule");

const seed = async () => {
  let mongo;

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const output = JSON.parse(await fs.readFileSync("output.json").toString())[0];
  const tickets = output.tickets;
  tickets.forEach(async (ticket) => {
    const ticketO = new Ticket({ ...ticket });
    await ticketO.save();
  });
  const bustType = new BusType({ ...output.bus_type });
  await bustType.save();
  const route = new Route({ ...output.route });
  await route.save();

  const schedule = new Schedule({ ...output });
  await schedule.save();

  const dateO = new Date(new Date().setHours(0, 0, 0, 0));

  const searchResults = await Schedule.find({
    $and: [{ from: { $lte: dateO } }, { to: { $gte: dateO } }],
  }).populate([
    { path: "tickets", match: { date: dateO } },
    { path: "route", match: { path: { $all: ["Colombo", "Sammanthurai"] } } },
  ]);
  console.log(searchResults[0].route.path);
};

// https://stackoverflow.com/questions/36019713/mongodb-nested-lookup-with-3-levels

seed();

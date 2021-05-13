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

  const from = "Colombo";
  const to = "Sammanthurai";

  const searchResults = await Schedule.aggregate([
    {
      $lookup: {
        from: "routes",
        pipeline: [{ $match: { $and: [{ path: { $all: [from, to] } }] } }],
        as: "route",
      },
    },
    {
      $unwind: "$route",
    },
    // {
    //   $project: {
    //     // index: { $indexOfArray: ["$route.path", from] },
    //     condition: {
    //       $gt: [
    //         { $indexOfArray: ["$route.path", to] },
    //         { $indexOfArray: ["$route.path", from] },
    //       ],
    //     },
    //   },
    // },
    {
      $match: {
        $expr: {
          $gt: [
            { $indexOfArray: ["$route.path", to] },
            { $indexOfArray: ["$route.path", from] },
          ],
        },
      },
    },
  ]);
  console.log(searchResults);
};

seed();

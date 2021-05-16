// importing user defined schema modules
const Schedule = require("../models/schedule");
const BusType = require("../models/bus-type");
const Ticket = require("../models/ticket");
const { writeThis } = require("../utils/fs");

exports.createSchedule = async (req, res, next) => {
  let { route, bus_type, from, to, departure, arrival, recurring, price } =
    req.body;

  const toDO = new Date(to);
  const fromDO = new Date(from);

  let schedule = new Schedule({
    creator: req.currentUser.encryptedId,
    route,
    bus_type,
    from: fromDO,
    to: toDO,
    departure,
    arrival,
    recurring,
    price,
  });

  const busType = await BusType.findById(bus_type);

  const difference = (toDO - fromDO) / (1000 * 60 * 60 * 24);

  for (let i = 0; i <= difference; i++) {
    const fromT = new Date(fromDO);
    const date = new Date(fromT.setDate(fromT.getDate() + i));
    for (let j = 0; j < busType.number_of_seats; j++) {
      const ticket = new Ticket({
        schedule: schedule._id,
        seat_number: j,
        date,
        price,
      });
      await ticket.save();
      schedule.tickets.push(ticket);
    }
  }
  schedule = await schedule.save();
  schedule = await Schedule.findOne({ _id: schedule._id }).populate("route");
  return res.status(201).json(schedule);
};

exports.updateSchedule = async (req, res, next) => {
  let {
    schedule_id,
    route,
    bus_type,
    from,
    to,
    departure,
    arrival,
    recurring,
    price,
  } = req.body;

  const schedule = await Schedule.findByIdAndUpdate(
    schedule_id,
    {
      route,
      bus_type,
      from,
      to,
      departure,
      arrival,
      recurring,
      price,
    },
    { new: true }
  ).populate("route bus_type");

  return res.status(201).json(schedule);
};

exports.deleteSchedule = async (req, res, next) => {
  let { schedule_id } = req.body;

  const schedule = await Schedule.findOneAndDelete(schedule_id);

  return res.status(201).json(schedule);
};

exports.searchSchedule = async (req, res, next) => {
  const { from, to, date } = req.body;
  const dateO = new Date(date);

  let schedules = await Schedule.aggregate([
    { $match: { $and: [{ from: { $lte: dateO } }, { to: { $gte: dateO } }] } },
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
    {
      $lookup: {
        from: "tickets",
        pipeline: [
          {
            $match: {
              date: dateO,
            },
          },
        ],
        as: "tickets",
      },
    },
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
  schedules = schedules.map((schedule) => {
    delete schedule.tickets;
    return schedule;
  });
  return res.status(200).json(schedules);
};

exports.getSchedule = async (req, res, next) => {
  let schedules = await Schedule.find({
    creator: req.currentUser.encryptedId,
  }).populate("route bus_type");
  return res.status(200).json(schedules);
};

// importing user defined schema modules
const Schedule = require("../models/schedule");
const BusType = require("../models/bus-type");
const Ticket = require("../models/ticket");
const { writeThis } = require("../utils/fs");

exports.createSchedule = async (req, res, next) => {
  let {
    route,
    bus_type,
    from,
    to,
    departure,
    arrival,
    recurring,
    price,
  } = req.body;

  const toDO = new Date(to).setHours(0, 0, 0, 0);
  const fromDO = new Date(from).setHours(0, 0, 0, 0);

  const schedule = new Schedule({
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
  await schedule.save();
  return res.status(201).json(schedule);
};

exports.getSchedule = async (req, res, next) => {
  const { from, to, date } = req.body;
  const dateO = new Date(date).setHours(0, 0, 0, 0);
  const schedule = await Schedule.find({
    $and: [{ from: { $lte: dateO } }, { to: { $gte: dateO } }],
  }).populate("tickets bus_type route");
  writeThis(schedule);
  return res.end();
};

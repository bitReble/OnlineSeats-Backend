// importing user defined schema modules
const Schedule = require("../models/schedule");
const BusType = require("../models/bus-type");
const Ticket = require("../models/ticket");

exports.createSchedule = async (req, res, next) => {
  const {
    route,
    bus_type,
    from,
    to,
    departure,
    arrival,
    recurring,
    price,
  } = req.body;

  const schedule = new Schedule({
    route,
    bus_type,
    from,
    to,
    departure,
    arrival,
    recurring,
    price,
  });

  const busType = await BusType.findById(bus_type);

  const toDO = new Date(to);
  const fromDO = new Date(from);
  const difference = (toDO - fromDO) / (1000 * 60 * 60 * 24);

  for (let i = 0; i < difference; i++) {
    const fromT = new Date(fromDO);
    const date = new Date(fromT.setDate(fromT.getDate() + (i + 1)));
    for (let j = 0; j < busType.number_of_seats; j++) {
      const ticket = new Ticket({
        schedule: schedule._id,
        seat_number: j,
        day: date,
        price,
      });
      await ticket.save();
      schedule.tickets.push(ticket);
    }
  }
  await schedule.save();
  console.log(schedule);
  return res.status(201).json(schedule);
};

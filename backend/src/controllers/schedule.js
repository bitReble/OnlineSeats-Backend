// importing user defined schema modules
const Schedule = require("../models/schedule");

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
  await schedule.save();
  return res.status(201).json(schedule);
};

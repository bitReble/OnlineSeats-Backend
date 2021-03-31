// importing modules

// importing user defined schema modules
const BusType = require("../model/bus-type");

// importing user defined functions

// operator create bus type controller
exports.createBusType = async (req, res, next) => {
  const { name, number_of_seats, left, right } = req.body;
  const busType = new BusType({ name, number_of_seats, left, right });
  await busType.save();
  res.status(201).json(busType);
};

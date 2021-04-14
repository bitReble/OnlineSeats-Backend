// importing modules
const { NotAuthorizedError } = require("@coders2authority/bus-common");

// importing user defined schema modules
const BusType = require("../models/bus-type");
const Operator = require("../models/operator");

// importing user defined functions

// operator create bus type controller
exports.createBusType = async (req, res, next) => {
  const { name, number_of_seats, left, right } = req.body;

  const busType = new BusType({
    name,
    number_of_seats,
    left,
    right,
    creator: req.currentUser.encryptedId,
  });
  await busType.save();
  res.status(201).json(busType);
};

exports.updateBusType = async (req, res, next) => {
  const { bus_id, name, number_of_seats, left, right } = req.body;

  const updatedBusType = await BusType.findByIdAndUpdate(
    bus_id,
    {
      name,
      number_of_seats,
      left,
      right,
    },
    { new: true }
  );

  return res.status(201).json(updatedBusType);
};

exports.deleteBusType = async (req, res, next) => {
  const { bus_id } = req.body;
  const deletedBusType = await BusType.findByIdAndDelete(bus_id);
  return res.status(201).json(deletedBusType);
};

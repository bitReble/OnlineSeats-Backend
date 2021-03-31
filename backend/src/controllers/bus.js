// importing modules
const { NotAuthorizedError } = require("@coders2authority/bus-common");

// importing user defined schema modules
const BusType = require("../models/bus-type");
const Operator = require("../models/operator");

// importing user defined functions

// operator create bus type controller
exports.createBusType = async (req, res, next) => {
  const { name, number_of_seats, left, right } = req.body;

  const operator = await Operator.findById(req.currentUser.encryptedId);
  if (!operator) {
    throw new NotAuthorizedError();
  }

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

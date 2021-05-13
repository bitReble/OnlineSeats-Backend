const { NotAuthorizedError } = require("@coders2authority/bus-common");
const Operator = require("../models/operator");

exports.allowOperator = async (req, res, next) => {
  const { encryptedId } = req.currentUser;
  const operator = await Operator.findById(encryptedId);
  if (!operator) {
    throw new NotAuthorizedError();
  }
  next();
};

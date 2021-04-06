const Route = require("../models/route");

exports.createRoute = async (req, res, next) => {
  const { path } = req.body;
  const route = new Route({ path });
  await route.save();
  return res.status(201).json(route);
};

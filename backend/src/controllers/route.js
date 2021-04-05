const Route = require("../models/route");

exports.createRoute = async (req, res, next) => {
  const { from, to, path } = req.body;
  const route = new Route({ from, to, path });
  await route.save();
  return res.status(201).json(route);
};

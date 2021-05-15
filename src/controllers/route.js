const { BadRequestError } = require("@coders2authority/bus-common");
const Route = require("../models/route");
const Schedule = require("../models/schedule");

exports.createRoute = async (req, res, next) => {
  const { path } = req.body;
  const route = new Route({ path, creator: req.currentUser.encryptedId });
  await route.save();
  return res.status(201).json(route);
};

exports.getRoutes = async (req, res, next) => {
  const routes = await Route.find({ creator: req.currentUser.encryptedId });
  return res.json(routes);
};

exports.updateRoute = async (req, res, next) => {
  const { route_id, path } = req.body;

  const isRouteBinded = await Schedule.exists({ route: route_id });

  if (isRouteBinded) {
    throw new BadRequestError("can't update, route was binded with a schedule");
  }

  const route = await Route.findByIdAndUpdate(
    route_id,
    {
      path,
    },
    { new: true }
  );
  return res.status(201).json(route);
};

exports.deleteRoute = async (req, res, next) => {
  const { route_id } = req.body;

  const isRouteBinded = await Schedule.exists({ route: route_id });

  if (isRouteBinded) {
    throw new BadRequestError("can't delete, route was binded with a schedule");
  }

  const route = await Route.findByIdAndDelete(route_id);
  return res.status(201).json(route);
};

// user signup controller
exports.signup = (req, res, next) => {
  console.log({ emitted: "controllers.auth.signup" });
  return res.json({ msg: "user was successfully created!" });
};

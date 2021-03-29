// importing modules
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// importing user defined schema modules
const Operator = require("../model/operator");
const Admin = require("../model/admin");

// importing user defined functions
const { compare, toHash } = require("../util/password");

// operator signup controller
exports.signupOperator = async (req, res, next) => {
  console.log({ emitted: "controllers.auth.signupOperator" });

  // validating the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, name, password } = req.body;

  try {
    const operator = new Operator({
      name: name,
      email: email,
      password: password,
    });

    await operator.save();
    return res.json({
      msg: "operator was successfully created!",
      _id: operator._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.data = [{ msg: "exception!" }];
    }
    return next(err);
  }
};

// operator signin controller
exports.signinOperator = async (req, res, next) => {
  console.log({ emitted: "controllers.auth.signinOperator" });

  // validating the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const operator = await Operator.findOne({ email: email });
    if (!operator) {
      const error = new Error("operator doesn't exist!");
      error.statusCode = 401;
      error.data = [{ msg: "operator doesn't exist!" }];
      return next(error);
    }

    const isAuth = await compare(password, operator.password);

    if (!isAuth) {
      const error = new Error("wrong password!");
      error.statusCode = 401;
      error.data = [{ msg: "wrong password!" }];
      return next(error);
    }

    const token = jwt.sign(
      { encryptedId: operator._id },
      process.env.jwt_secret,
      { expiresIn: "2h" }
    );

    return res.json({
      msg: "successfully logged in!",
      token: token,
      user_id: operator._id,
      expires_in: 2 * 60 * 60,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.data = [{ msg: "exception!" }];
    }
    return next(err);
  }
};

// admin signin controller
exports.signinAdmin = async (req, res, next) => {
  console.log({ emitted: "controllers.auth.signinAdmin" });

  // validating the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      const error = new Error("admin doesn't exist!");
      error.statusCode = 401;
      error.data = [{ msg: "admin doesn't exist!" }];
      return next(error);
    }

    const isAuth = await compare(admin.password, password);

    if (!isAuth) {
      const error = new Error("wrong password!");
      error.statusCode = 401;
      error.data = [{ msg: "wrong password!" }];
      return next(error);
    }

    const token = jwt.sign({ encryptedId: admin._id }, process.env.jwt_secret, {
      expiresIn: "2h",
    });

    return res.json({
      msg: "successfully logged in!",
      token: token,
      user_id: admin._id,
      expires_in: 2 * 60 * 60,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.data = [{ msg: "exception!" }];
    }
    return next(err);
  }
};

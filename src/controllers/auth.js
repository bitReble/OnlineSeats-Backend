// importing modules
const jwt = require("jsonwebtoken");

// importing user defined schema modules
const Operator = require("../model/operator");
const Admin = require("../model/admin");

// importing user defined functions
const { compare, toHash } = require("../util/password");
const { BadRequestError } = require("@coders2authority/tik-common");

// operator signup controller
exports.signupOperator = async (req, res, next) => {
  const { email, name, password } = req.body;

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
};

// operator signin controller
exports.signinOperator = async (req, res, next) => {
  const { email, password } = req.body;

  const operator = await Operator.findOne({ email: email });

  if (!operator) {
    throw new BadRequestError("invalid credentials");
  }

  const isAuth = await compare(operator.password, password);
  if (!isAuth) {
    throw new BadRequestError("invalid credentials");
  }

  const token = jwt.sign({ encryptedId: operator._id }, process.env.JWT_KEY, {
    expiresIn: "2h",
  });

  return res.json({
    msg: "successfully logged in!",
    token: token,
    user_id: operator._id,
    expires_in: 2 * 60 * 60,
  });
};

// admin signin controller
exports.signinAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    throw new BadRequestError("invalid credentials");
  }

  const isAuth = await compare(admin.password, password);

  if (!isAuth) {
    throw new BadRequestError("invalid credentials");
  }

  const token = jwt.sign({ encryptedId: admin._id }, process.env.JWT_KEY, {
    expiresIn: "2h",
  });

  return res.json({
    msg: "successfully logged in!",
    token: token,
    user_id: admin._id,
    expires_in: 2 * 60 * 60,
  });
};

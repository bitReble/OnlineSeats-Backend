const bcrypt = require("bcryptjs");

exports.toHash = async (password) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

exports.compare = async (storedPassword, suppliedPassword) => {
  const isAuth = await bcrypt.compare(password, admin.password);
  return isAuth;
};

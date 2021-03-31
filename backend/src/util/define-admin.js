// importing user defined schemas
const Admin = require("../model/admin");

exports.defineAdmin = async () => {
  const isAdminExist = await Admin.exists({ email: process.env.admin_email });
  if (!isAdminExist) {
    const admin = new Admin({
      email: process.env.admin_email,
      password: process.env.admin_password,
    });
    await admin.save();
  }
};

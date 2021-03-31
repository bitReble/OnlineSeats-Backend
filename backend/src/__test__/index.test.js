const Admin = require("../models/admin");

it("defines admin on startup", async () => {
  const admin = await Admin.findOne({ email: process.env.admin_email });
  expect(admin).toBeDefined();
  expect(admin).not.toEqual(null);
});

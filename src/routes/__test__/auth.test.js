const Admin = require("../../model/admin");

it("defines admin on startup", async () => {
  const admin = await Admin.findOne({ email: process.env.admin_email });
  expect(admin).toBeDefined();
});

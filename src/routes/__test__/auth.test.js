const request = require("supertest");
const app = require("../../app");

it("response with web tocken when valid credentials given", async () => {
  const res = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: process.env.admin_email,
      password: process.env.admin_password,
    })
    .expect(200);
  expect(res.body).toBeDefined();
});

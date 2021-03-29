const request = require("supertest");
const app = require("../../app");

it("validate email and password for admin", async () => {
  const res = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: "badEmail",
      password: "readPassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: process.env.admin_email,
      password: "bad",
    })
    .expect(400);
});

it("returns error when invalid credentials were given for admin", async () => {
  const res = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: process.env.admin_email,
      password: "fakePassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: "fakeEmail@gmail.com",
      password: "fakePassword",
    })
    .expect(400);
});

it("response with web tocken when valid credentials were given for admin", async () => {
  const res = await request(app)
    .post("/auth/signin/admin")
    .send({
      email: process.env.admin_email,
      password: process.env.admin_password,
    })
    .expect(200);
  expect(res.body).toBeDefined();
});

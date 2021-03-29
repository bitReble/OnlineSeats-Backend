const request = require("supertest");
const app = require("../../app");

// Test admin's hit points
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
      password: process.env.admin_password,
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

// Test operator's hitpoint
it("validate email and password for operator", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const res = await request(app)
    .post("/auth/signin/operator")
    .send({
      email: "badEmail",
      password: "readPassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/signin/operator")
    .send({
      email: process.env.admin_email,
      password: "bad",
    })
    .expect(400);
});

it("returns error when invalid credentials were given for operator", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const res = await request(app)
    .post("/auth/signin/operator")
    .send({
      email: "operator",
      password: password,
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/signin/operator")
    .send({
      email: email,
      password: "wrontPassword",
    })
    .expect(400);
});

it("response with web tocken when valid credentials were given for operator", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const Operator = require("../../model/operator");

  const res = await request(app)
    .post("/auth/signin/operator")
    .send({
      email: email,
      password: password,
    })
    .expect(200);
  expect(res.body).toBeDefined();
});

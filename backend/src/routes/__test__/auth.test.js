const request = require("supertest");
const app = require("../../app");

// Test admin's hit points
it("validate email and password for admin @singIn", async () => {
  const res = await request(app)
    .post("/auth/admin/signin")
    .send({
      email: "badEmail",
      password: "readPassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/admin/signin")
    .send({
      email: process.env.admin_email,
      password: "bad",
    })
    .expect(400);
});

it("returns error when invalid credentials were given for admin @singIn", async () => {
  const res = await request(app)
    .post("/auth/admin/signin")
    .send({
      email: process.env.admin_email,
      password: "fakePassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/admin/signin")
    .send({
      email: "fakeEmail@gmail.com",
      password: process.env.admin_password,
    })
    .expect(400);
});

it("response with web tocken when valid credentials were given for admin @singIn", async () => {
  const res = await request(app)
    .post("/auth/admin/signin")
    .send({
      email: process.env.admin_email,
      password: process.env.admin_password,
    })
    .expect(200);
  expect(res.body).toBeDefined();
});

// Test operator's hitpoint
it("validate email and password for operator @singIn", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const res = await request(app)
    .post("/auth/operator/signin")
    .send({
      email: "badEmail",
      password: "readPassword",
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/operator/signin")
    .send({
      email: process.env.admin_email,
      password: "bad",
    })
    .expect(400);
});

it("returns error when invalid credentials were given for operator @singIn", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const res = await request(app)
    .post("/auth/operator/signin")
    .send({
      email: "operator",
      password: password,
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/operator/signin")
    .send({
      email: email,
      password: "wrontPassword",
    })
    .expect(400);
});

it("response with web tocken when valid credentials were given for operator @singIn", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";
  const operator = await global.createOperator(name, email, password);

  const res = await request(app)
    .post("/auth/operator/signin")
    .send({
      email: email,
      password: password,
    })
    .expect(200);
  expect(res.body).toBeDefined();
});

it("validate email and password for operator @singUp", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";

  const res = await request(app)
    .post("/auth/operator/signup")
    .send({
      naem: "",
      email: email,
      password: password,
    })
    .expect(400);

  const res2 = await request(app)
    .post("/auth/operator/signup")
    .send({
      name,
      email,
      password: "bad",
    })
    .expect(400);

  const res3 = await request(app)
    .post("/auth/operator/signup")
    .send({
      name,
      email: "wrontEmail",
      password: password,
    })
    .expect(400);
});

it("create user when valid credentials were given for operator @singUp", async () => {
  const email = "operator@gmail.com";
  const password = "password";
  const name = "freedom";

  const res = await request(app)
    .post("/auth/operator/signup")
    .send({
      name,
      email,
      password,
    })
    .expect(201);
});

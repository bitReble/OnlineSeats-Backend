const request = require("supertest");
const app = require("../../app");

it("validate route input before saving", async () => {
  const operatorName = "FreeDoM";
  const email = "operator@gmail.com";
  const password = "password";

  const operator = await global.createOperator(operatorName, email, password);

  const authPayload = await request(app)
    .post("/auth/operator/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  const res = await request(app)
    .post("/route/create-route")
    .send({})
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(400);

  const res3 = await request(app)
    .post("/route/create-route")
    .send({ path: "Invalid" })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(400);

  const res4 = await request(app)
    .post("/route/create-route")
    .send({ path: [] })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(400);
});

it("shout save route when valid input were given", async () => {
  const operatorName = "FreeDoM";
  const email = "operator@gmail.com";
  const password = "password";

  const operator = await global.createOperator(operatorName, email, password);

  const authPayload = await request(app)
    .post("/auth/operator/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  const from = "Colombo";
  const to = "Sammanthurai";

  const res = await request(app)
    .post("/route/create-route")
    .send({ path: [from, to] })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(201);
});

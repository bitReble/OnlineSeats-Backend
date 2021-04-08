const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

it("validate schedule input before saving", async () => {
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
    .post("/schedule/create-schedule")
    .send({})
    .expect(401);

  const res2 = await request(app)
    .post("/schedule/create-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({})
    .expect(400);
});

it("create schedule when valid input was given", async () => {
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
    .post("/schedule/create-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      route: mongoose.Types.ObjectId(),
      bus_type: mongoose.Types.ObjectId(),
      from: new Date(),
      to: new Date(),
      departure: new Date(),
      arrival: new Date(),
      recurring: ["monday"],
    })
    .expect(201);
});

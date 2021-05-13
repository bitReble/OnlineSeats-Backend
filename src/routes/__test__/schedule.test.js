const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const BusType = require("../../models/bus-type");
const Route = require("../../models/route");

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

  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;

  const busType = new BusType({
    name,
    number_of_seats,
    left,
    right,
    creator: authPayload.body.user_id,
  });
  await busType.save();

  const res = await request(app)
    .post("/schedule/create-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      route: mongoose.Types.ObjectId(),
      bus_type: busType._id,
      from: new Date(),
      to: new Date().setDate(new Date().getDate() + 5),
      departure: new Date(),
      arrival: new Date(),
      recurring: ["monday"],
      price: 20,
    })
    .expect(201);
});

it("returns schedule for relevent input", async () => {
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

  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;

  const busType = new BusType({
    name,
    number_of_seats,
    left,
    right,
    creator: authPayload.body.user_id,
  });
  await busType.save();

  const from = "Colombo";
  const to = "Sammanthurai";

  const route = new Route({ path: [from, to], creator: operator._id });
  await route.save();

  const res = await request(app)
    .post("/schedule/create-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      route: route._id,
      bus_type: busType._id,
      from: new Date(),
      to: new Date().setDate(new Date().getDate() + 5),
      departure: new Date(),
      arrival: new Date(),
      recurring: ["monday"],
      price: 20,
    })
    .expect(201);

  const res2 = await request(app)
    .post("/schedule/get-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      from,
      to,
      date: new Date(),
    })
    .expect(200);
  expect(res2.body.length).toEqual(1);

  const res3 = await request(app)
    .post("/schedule/get-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      from: to,
      to: from,
      date: new Date(),
    })
    .expect(200);
  expect(res3.body.length).toEqual(0);

  const res4 = await request(app)
    .post("/schedule/get-schedule")
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .send({
      from,
      to,
      date: new Date().setDate(new Date().getDate() + 6),
    })
    .expect(200);
  expect(res4.body.length).toEqual(0);
});

const request = require("supertest");
const app = require("../../app");

const BusType = require("../../models/bus-type");

it("validate bus-type input before saving", async () => {
  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;
  const res = await request(app)
    .post("/bus/create-bus-type")
    .send({ name: "x", number_of_seats, left, right })
    .expect(400);

  const res2 = await request(app)
    .post("/bus/create-bus-type")
    .send({ name, left, right })
    .expect(400);

  const res3 = await request(app)
    .post("/bus/create-bus-type")
    .send({ name, number_of_seats, right })
    .expect(400);

  const res4 = await request(app)
    .post("/bus/create-bus-type")
    .send({ name, number_of_seats, left })
    .expect(400);
});

it("creates bus type when user logged in and valid informations are given", async () => {
  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;

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
    .post("/bus/create-bus-type")
    .send({ name, number_of_seats, left, right })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(201);
});

it("update bus type when user logged in and valid informations are given", async () => {
  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;

  const operatorName = "FreeDoM";
  const email = "operator@gmail.com";
  const password = "password";

  const operator = await global.createOperator(operatorName, email, password);

  const busType = new BusType({
    creator: operator._id,
    name,
    number_of_seats,
    left,
    right,
  });
  await busType.save();

  const authPayload = await request(app)
    .post("/auth/operator/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  const res = await request(app)
    .put("/bus/update-bus-type")
    .send({ bus_id: busType._id, name, number_of_seats: 64, left, right })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(201);
});

it("delete bus type when user logged in and valid informations are given", async () => {
  const name = "54 Seats Bus";
  const number_of_seats = 54;
  const left = 3;
  const right = 2;

  const operatorName = "FreeDoM";
  const email = "operator@gmail.com";
  const password = "password";

  const operator = await global.createOperator(operatorName, email, password);

  const busType = new BusType({
    creator: operator._id,
    name,
    number_of_seats,
    left,
    right,
  });
  await busType.save();

  const authPayload = await request(app)
    .post("/auth/operator/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  const res = await request(app)
    .delete("/bus/delete-bus-type")
    .send({ bus_id: busType._id })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(201);
});

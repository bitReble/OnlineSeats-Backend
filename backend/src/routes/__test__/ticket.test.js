const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Ticket = require("../../models/ticket");

it("demo", async () => {
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

  const ticket = new Ticket({
    schedule: mongoose.Types.ObjectId(),
    seat_number: 20,
    date: new Date(),
    price: 20,
    locked_time: new Date(),
  });

  await ticket.save();

  const res = await request(app)
    .post("/ticket/lock-ticket")
    .send({
      ticket_id: ticket._id,
    })
    .set("Authorizaition", `Bearer: ${authPayload.body.token}`)
    .expect(201);
});

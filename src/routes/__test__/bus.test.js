const request = require("supertest");
const app = require("../../app");

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

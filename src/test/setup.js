const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { defineAdmin } = require("../util/define-admin");

let mongo;

beforeAll(async () => {
  process.env.admin_email = "slbooking@gmail.com";
  process.env.admin_password = "bitReble";
  process.env.JWT_KEY = "i_use_bitreble_for_jwt";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
  await defineAdmin();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.disconnect();
});

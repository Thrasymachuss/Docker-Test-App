const supertest = require("supertest");
const prisma = require("../client.js");
const getServer = require("../getServer");

describe("Test the API", () => {
  beforeEach(async () => {
    await new Promise((res) => setTimeout(res, 6000));
    await prisma.User.deleteMany();
  });

  afterEach(async () => {
    await prisma.User.deleteMany();
  });

  it("returns the default output", async () => {
    const app = getServer(prisma);
    const req = supertest(app);
    await req
      .get("/user-info")
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe("Ryan");
        expect(res.body.color).toBe("Blue");
      });
  });
});

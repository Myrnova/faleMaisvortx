const request = require("supertest");
const app = require("../app");

describe("Prices", () => {
  it("should be able to give a return price", async () => {
    const price = await request(app)
      .post("/price")
      .send({
        origin: '011',
        destiny: '016',
        time: 20,
        plan: "FaleMais 30",
      });

    expect(response.body).toMatchObject({
      value: '$ 38,00',
    });
  });

  it("should not be able to return any value to inexistent combination", async () => {
    await request(app)
      .post(`/price`)
      .send({
        origin: '018',
        destiny: '017',
        time: 100,
        plan: "FaleMais 30",
    })
    expect(response.body).toMatchObject({
      value: '-',
    });
  });
});

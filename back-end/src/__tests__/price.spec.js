
import app from '../app.ts'
import request from 'supertest'

describe("Prices", () => {
  it("should be able to return a price", async () => {
    const response = await request(app)
      .post(`/price`)
      .send({
        origin: '011',
        destiny: '016',
        time: 20,
        plan: "30",
      });

    expect(response.body).toMatchObject({
      valueWithPlan: "R$ 0,00",
      valueWithoutPlan: "R$ 38,00",
    });
  });

  it("should not be able to return any value to inexistent combination", async () => {
    const response = await request(app)
      .post(`/price`)
      .send({
        origin: '018',
        destiny: '017',
        time: 100,
        plan: "30",
    })
    expect(response.body).toMatchObject({
      valueWithPlan: '-',
      valueWithoutPlan: '-',
    });
  });
});

const request = require("supertest");
const app = require("../../src/app");

describe("Router", () => {
  describe("GET /contracts/:id", () => {
    it("should return the contract with the specified id", async () => {
      const response = await request(app)
        .get("/contracts/1")
        .set("profile_id", 1);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        terms: "bla bla bla",
        status: "terminated",
        ContractorId: 5,
        ClientId: 1,
      });
    });
  });

  describe("GET /contracts", () => {
    it("should return all contracts", async () => {
      const response = await request(app)
        .get("/contracts")
        .set("profile_id", 1);
      expect(response.body).toMatchObject([
        {
          id: 2,
          terms: "bla bla bla",
          status: "in_progress",
          ContractorId: 6,
          ClientId: 1,
        },
      ]);
      expect(response.status).toBe(200);
    });
  });

  describe("GET /jobs/unpaid", () => {
    it("should return all unpaid jobs", async () => {
      const response = await request(app)
        .get("/jobs/unpaid")
        .set("profile_id", 1);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        {
          id: 2,
          description: "work",
          price: 201,
          paid: null,
          paymentDate: null,
          ContractId: 2,
        },
      ]);
      // Add more assertions here
    });
  });

  describe("POST /jobs/:id/pay", () => {
    it("should pay the job with the specified id", async () => {
      const response = await request(app)
        .post("/jobs/1/pay")
        .set("profile_id", 1);
      // WARNING: this test will fail when profile balance is less than the job price
      expect(response.status).toBe(200);
    });
  });

  describe("POST /balances/deposit/:userId", () => {
    it("should update the balance for the specified user", async () => {
      const response = await request(app).post("/balances/deposit/1").send({
        amount: 10,
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        firstName: "Harry",
        lastName: "Potter",
        profession: "Wizard",
        type: "client",
      });
    });
  });

  describe("GET /admin/best-profession", () => {
    it("should return the best profession", async () => {
      const response = await request(app).get(
        "/admin/best-profession?start=2015-03-17T00:46:39.701Z&end=2024-03-18T00:46:39.701Z&limit=1"
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        { profession: "Programmer", paid: 2683 },
        { profession: "Musician", paid: 221 },
        { profession: "Fighter", paid: 200 },
      ]);
    });
  });

  describe("GET /admin/best-clients", () => {
    it("should return the best clients", async () => {
      const response = await request(app).get(
        "/admin/best-clients?start=2015-03-17T00:46:39.701Z&end=2024-03-18T00:46:39.701Z"
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        { id: 4, fullName: "Ash Kethcum", paid: 2020 },
        { id: 1, fullName: "Harry Potter", paid: 442 },
      ]);
    });
  });
});

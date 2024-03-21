const { Op } = require("sequelize");
const {
  getBestProfession,
  getBestClient,
} = require("../../../src/handlers/admin");

describe("getBestProfession", () => {
  it("should return the best profession based on paid jobs within a given date range", async () => {
    const req = {
      app: {
        get: jest.fn().mockReturnValue({
          Job: {
            findAll: jest.fn().mockResolvedValue([
              {
                getContract: jest.fn().mockResolvedValue({
                  getContractor: jest.fn().mockResolvedValue({
                    profession: "Engineer",
                  }),
                }),
                price: 1000,
              },
              {
                getContract: jest.fn().mockResolvedValue({
                  getContractor: jest.fn().mockResolvedValue({
                    profession: "Engineer",
                  }),
                }),
                price: 1500,
              },
              {
                getContract: jest.fn().mockResolvedValue({
                  getContractor: jest.fn().mockResolvedValue({
                    profession: "Designer",
                  }),
                }),
                price: 2000,
              },
            ]),
          },
        }),
      },
      query: {
        start: "2022-01-01",
        end: "2022-01-31",
      },
    };

    const res = {
      json: jest.fn(),
    };

    await getBestProfession(req, res);

    expect(req.app.get).toHaveBeenCalledWith("models");
    expect(req.app.get("models").Job.findAll).toHaveBeenCalledWith({
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: ["2022-01-01", "2022-01-31"],
        },
      },
    });
    expect(res.json).toHaveBeenCalledWith([
      { paid: 2500, profession: "Engineer" },
      { paid: 2000, profession: "Designer" },
    ]);
  });
});
describe("getBestClient", () => {
  it("should return the best clients based on paid jobs within a given date range", async () => {
    const req = {
      app: {
        get: jest.fn().mockReturnValue({
          Job: {
            findAll: jest.fn().mockResolvedValue([
              {
                getContract: jest.fn().mockResolvedValue({
                  getClient: jest.fn().mockResolvedValue({
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                  }),
                }),
                price: 1000,
              },
              {
                getContract: jest.fn().mockResolvedValue({
                  getClient: jest.fn().mockResolvedValue({
                    id: 2,
                    firstName: "Jane",
                    lastName: "Smith",
                  }),
                }),
                price: 1500,
              },
              {
                getContract: jest.fn().mockResolvedValue({
                  getClient: jest.fn().mockResolvedValue({
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                  }),
                }),
                price: 2000,
              },
            ]),
          },
        }),
      },
      query: {
        start: "2022-01-01",
        end: "2022-01-31",
        limit: 2,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await getBestClient(req, res);

    expect(req.app.get).toHaveBeenCalledWith("models");
    expect(req.app.get("models").Job.findAll).toHaveBeenCalledWith({
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: ["2022-01-01", "2022-01-31"],
        },
      },
    });
    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        fullName: "John Doe",
        paid: 3000,
      },
      {
        id: 2,
        fullName: "Jane Smith",
        paid: 1500,
      },
    ]);
  });
});

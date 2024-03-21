const {
  getOneContract,
  getAllContracts,
} = require("../../../src/handlers/contract");

describe("getOneContract", () => {
  it("should return the contract with the given id and matching attribute type and profile id", async () => {
    const req = {
      app: {
        get: jest.fn().mockReturnValue({
          Contract: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              ClientId: 123,
            }),
          },
        }),
      },
      params: {
        id: 1,
      },
      profile: {
        id: 123,
        type: "client",
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    await getOneContract(req, res);

    expect(req.app.get).toHaveBeenCalledWith("models");
    expect(req.app.get("models").Contract.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
        ClientId: 123,
      },
    });
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      ClientId: 123,
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
  });

  it("should return 401 status if profile or contract is not found", async () => {
    const req = {
      app: {
        get: jest.fn().mockReturnValue({
          Contract: {
            findOne: jest.fn().mockResolvedValue({}),
          },
        }),
      },
      params: {
        id: 1,
      },
      profile: null,
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    await getOneContract(req, res);

    expect(req.app.get).toHaveBeenCalledWith("models");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe("getOneContract", () => {
  // Existing test code...

  it("should return all contracts with matching attribute type and profile id", async () => {
    const req = {
      app: {
        get: jest.fn().mockReturnValue({
          Contract: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                ClientId: 123,
              },
              {
                id: 2,
                ClientId: 123,
              },
            ]),
          },
        }),
      },
      profile: {
        id: 123,
        type: "client",
      },
    };

    const res = {
      json: jest.fn(),
    };

    await getAllContracts(req, res);

    expect(req.app.get).toHaveBeenCalledWith("models");
    expect(req.app.get("models").Contract.findAll).toHaveBeenCalledWith({
      where: {
        ClientId: 123,
        status: "in_progress",
      },
    });
    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        ClientId: 123,
      },
      {
        id: 2,
        ClientId: 123,
      },
    ]);
  });
});

const handler = require("../api/user.js");
const { getUserFromDB } = require("../lib/database");
const fetch = require("node-fetch");

// Mock database functions
jest.mock("../lib/database", () => ({
  getUserFromDB: jest.fn(),
}));

// Mock fetch API
jest.mock("node-fetch", () => jest.fn());

// Mock global Response
global.Response = class {
  constructor(body, options) {
    this.body = body;
    this.headers = options.headers;
  }
  async json() {
    return JSON.parse(this.body);
  }
};

test("User API should return mocked user data", async () => {
  getUserFromDB.mockResolvedValue({ id: "123", name: "Alice" }); // Mocked user data that will pass
  /* getUserFromDB.mockResolvedValue({ id: "123", firstName: "Alice" }); // Mocked user data that will fail */

  fetch.mockResolvedValue({
    json: async () => ({ externalInfo: "Mocked API" }),
  });

  const req = { query: { id: "123" } };
  const response = await handler(req);
  const data = await response.json();

  expect(getUserFromDB).toHaveBeenCalledWith("123");
  expect(fetch).toHaveBeenCalledWith("https://external-api.com/data/123");

  expect(data.user).toEqual({ id: "123", name: "Alice" });
  expect(data.externalData).toEqual({ externalInfo: "Mocked API" });
});
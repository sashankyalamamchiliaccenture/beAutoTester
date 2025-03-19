import handler from "../api/user.js";
import { getUserFromDB } from "../lib/database";
import fetch from "node-fetch";

jest.mock("../lib/database", () => ({ getUserFromDB: jest.fn() }));
jest.mock("node-fetch", () => jest.fn());

test("User API should return mocked data", async () => {
  getUserFromDB.mockResolvedValue({ id: "123", name: "Alice" });
  fetch.mockResolvedValue({ json: async () => ({ externalInfo: "Mocked API" }) });
  
  const req = { query: { id: "123" } };
  const response = await handler(req);
  const data = await response.json();
  
  expect(data.user).toEqual({ id: "123", name: "Alice" });
  expect(data.externalData).toEqual({ externalInfo: "Mocked API" });
});
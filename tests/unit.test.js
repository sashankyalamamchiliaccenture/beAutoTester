import handler from "../api/user.js";
import { getUserFromDB } from "../lib/database";
import fetch from "node-fetch";
import { jest } from "@jest/globals";

// Mock database functions
jest.mock("../lib/database", () => ({
  getUserFromDB: jest.fn(),
}));

// Mock fetch API
jest.mock("node-fetch", () => jest.fn());

test("User API should return mocked user data", async () => {
  // Mock database response
  getUserFromDB.mockResolvedValue({ id: "123", name: "Alice" });

  // Mock external API response
  fetch.mockResolvedValue({
    json: async () => ({ externalInfo: "Mocked API" }),
  });

  // Simulate API request
  const req = { query: { id: "123" } };
  const response = await handler(req);
  const data = await response.json();

  // Assertions
  expect(data.user).toEqual({ id: "123", name: "Alice" });
  expect(data.externalData).toEqual({ externalInfo: "Mocked API" });
});
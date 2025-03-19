import handler from "../api/user.js";

test("Integration Test (with real DB & API)", async () => {
  if (process.env.TEST_ENV !== "staging") return;
  const req = { query: { id: "123" } };
  const response = await handler(req);
  const data = await response.json();
  console.log("Integration Test Response:", data);
  expect(data).toHaveProperty("user");
  expect(data).toHaveProperty("externalData");
});
import handler from "../api/user.js";

test("Integration Test (with real DB & API)", async () => {
  if (process.env.CI) {
    console.log("Running in CI mode, skipping external API call.");
    return;
  }

  const req = { query: { id: "123" } };
  const response = await handler(req);
  const data = await response.json();

  console.log("Integration Test Response:", data);
  expect(data).toHaveProperty("user");
  expect(data).toHaveProperty("externalData");
});
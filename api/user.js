const { getUserFromDB } = require("../lib/database");
const fetch = require("node-fetch");

module.exports = async function handler(req) {
  const userId = req.query.id;
  const user = await getUserFromDB(userId);
  const externalData = await fetch(`https://external-api.com/data/${userId}`)
    .then(res => res.json());

  return new Response(
    JSON.stringify({ user, externalData }),
    { headers: { "Content-Type": "application/json" } }
  );
};
export default function handler(req) {
  return new Response(
    JSON.stringify({ message: "Hello, World! 🚀" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
export default {
  testEnvironment: "node", // Ensures tests run in a Node.js environment
  transform: {}, // Prevents Jest from trying to transform ES modules
  extensionsToTreatAsEsm: [".js"], // Ensures Jest treats `.js` files as ES modules
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1" // Fixes import paths for ES Modules
  }
};
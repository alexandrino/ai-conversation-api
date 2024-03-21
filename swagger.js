const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "AI Conversation",
    description: "AI Conversation and Summarization Application",
  },
  host: "localhost:3001",
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.js", "./src/middleware/getProfile.js"];

swaggerAutogen(outputFile, routes, doc);

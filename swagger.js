const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./dist/routes/agentsRoute.js"];

swaggerAutogen(outputFile, endpointsFiles);

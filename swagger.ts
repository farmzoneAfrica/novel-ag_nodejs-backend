const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./dist/*.js", "./dist/routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles);

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/*.ts"];

swaggerAutogen(outputFile, endpointsFiles);

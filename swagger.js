const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger-output.json";
const endpointsFiles = [ "./dist/index.js", "./dist/routes/agent.route.js", "./dist/routes/auth.route.js"];

swaggerAutogen(outputFile, endpointsFiles);
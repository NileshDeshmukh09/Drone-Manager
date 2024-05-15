const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const glob = require("glob");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NSE APIs Documentation",
      version: "1.0.0",
      description:
        "API documentation for nse project with Sequelize and OracleDB",
    },
    servers:[
        {
            url:`http://localhost:${process.env.PORT || 8000}`
        }
    ],

    
  },

  apis: ["./routes/*.js"],
};

function getSwaggerFiles() {
  const basePath = path.join(__dirname, "routes/");
  console.log(`basePath : `, basePath);
  const pattern = "/*.js";
  const files = glob.sync(pattern, { cwd: basePath, absolute: true });
  return files;
}

const specs = swaggerJsdoc(options);
module.exports = { specs, swaggerUi };

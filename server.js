const express = require("express");
const cors = require("cors");
const apiRouter = require("./api");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api/swagger-loader");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(port, () => {
  console.log(`Mock server running on http://localhost:${port}`);
  console.log(
    `Mock server running on http://localhost:${port}/api-docs/swagger.json`
  );
});

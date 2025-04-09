const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const apiRouter = require("./api");
const cors = require("cors"); // 新增
const app = express();
const swaggerDocument = YAML.load("./api/swagger.yaml");

// 配置 CORS（开发环境推荐配置）
app.use(
  cors({
    origin: "http://localhost:8080", // 只允许前端地址访问
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的 HTTP 方法
    allowedHeaders: ["Content-Type", "Authorization"], // 允许的请求头
  })
);

// 处理预检请求 (OPTIONS)
app.options("*", cors());
// 中间件
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 挂载 API 路由
app.use("/api", apiRouter);

// 统一错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/api-docs`);
});

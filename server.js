const express = require("express");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const mockData = require("./mock/data");

const app = express();
const PORT = 3000;

// 加载 Swagger 文档
const swaggerDoc = yaml.load(
  fs.readFileSync(path.join(__dirname, "api/swagger.yaml"), "utf8")
);

// 自定义 Mock 中间件
app.use("/api", (req, res, next) => {
  // GET /users
  if (req.method === "GET" && req.path === "/users") {
    return res.json(mockData.users);
  }

  // GET /users/:id
  if (req.method === "GET" && req.path.match(/^\/users\/\d+$/)) {
    const id = parseInt(req.path.split("/").pop());
    const user = mockData.users.find((u) => u.id === id);
    return user ? res.json(user) : res.status(404).end();
  }

  // 其他请求透传给 Swagger UI
  next();
});

// 配置 Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// 启动服务器
app.listen(PORT, () => {
  console.log(`
  Mock Server 已启动！
  - 接口文档: http://localhost:${PORT}/docs
  - Mock 接口示例:
    GET http://localhost:${PORT}/api/users
    GET http://localhost:${PORT}/api/users/1
  `);
});

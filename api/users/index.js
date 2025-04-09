const express = require("express");
const router = express.Router();
const mockData = require("./mock-data");

// GET /api/users
router.get("/users", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const results = mockData.users.slice(start, end);

  res.json(results);
});

// POST /api/users
router.post("/users", (req, res) => {
  res.status(201).json(mockData.userOperation.success);
});

// 用户详情相关路由
router
  .route("/users/:id")
  .get((req, res) => {
    const user = mockData.users.find((u) => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "用户不存在" });
  })
  .put((req, res) => {
    res.json(mockData.userOperation.success);
  })
  .delete((req, res) => {
    res.json({ success: true, message: "操作成功" });
  });

module.exports = router;

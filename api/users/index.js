const express = require("express");
const router = express.Router();
const mock = require("./mock-data");

// 获取所有用户
router.get("/", (req, res) => {
  res.json(mock.listUsers(req.query));
});

// 获取当前用户
router.get("/current", (req, res) => {
  // if (!req.headers.authorization) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "需要认证信息",
  //   });
  // }
  res.json(mock.getCurrentUser());
});

// 获取通知
router.get("/notifications", (req, res) => {
  res.json(mock.listNotifications(req.query.limit));
});

// 创建用户
router.post("/", (req, res) => {
  const requiredFields = ["name", "email", "password"];
  const missing = requiredFields.filter((f) => !req.body[f]);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: "参数错误",
      errors: missing.map((f) => `${f} 字段必填`),
    });
  }

  res.status(201).json(mock.createUser(req.body));
});

// 获取用户详情
router.get("/:id", (req, res) => {
  const user = mock.getUserById(req.params.id);
  user
    ? res.json(user)
    : res.status(404).json({
        success: false,
        message: "用户不存在",
      });
});

// 更新用户
router.put("/:id", (req, res) => {
  const result = mock.updateUser(req.params.id, req.body);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      success: false,
      message: "用户不存在",
    });
  }
});

// 删除用户
router.delete("/:id", (req, res) => {
  const result = mock.deleteUser(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      success: false,
      message: "用户不存在",
    });
  }
});

module.exports = router;

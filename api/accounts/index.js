const express = require("express");
const router = express.Router();
const mock = require("./mock-data");

// 用户注册
router.post("/register", (req, res) => {
  const requiredFields = ["name", "email", "password"];
  const missing = requiredFields.filter((f) => !req.body[f]);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: "参数错误",
      errors: missing.map((f) => `${f} 字段必填`),
    });
  }

  res.status(201).json(mock.register(req.body));
});

// 获取访问令牌
router.post("/token", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "需要邮箱和密码",
    });
  }

  if (password !== "yourPassword123") {
    return res.status(401).json({
      success: false,
      message: "认证失败",
    });
  }

  res.json(mock.login({ email, password }));
});

module.exports = router;

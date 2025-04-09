const express = require("express");
const router = express.Router();

// 加载各模块路由
router.use(require("./accounts"));
router.use(require("./users"));

module.exports = router;

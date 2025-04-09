const express = require("express");
const router = express.Router();

// Import module routers
const usersRouter = require("./users");
const accountsRouter = require("./accounts");

// Setup routes
router.use("/users", usersRouter);
router.use("/accounts", accountsRouter);

module.exports = router;

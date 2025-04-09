const express = require("express");
const router = express.Router();
const mockData = require("./mock-data");

// POST /api/accounts/register
router.post("/accounts/register", (req, res) => {
  res.status(201).json(mockData.registerUser.success);
});

// POST /api/account/token
router.post("/account/token", (req, res) => {
  const { email, password } = req.body;
  if (email === "user@example.com" && password === "yourPassword123") {
    res.json(mockData.getAccessToken.success);
  } else {
    res.status(401).json(mockData.getAccessToken.invalidCredentials);
  }
});

module.exports = router;

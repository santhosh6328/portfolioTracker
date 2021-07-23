const express = require("express");
const Trade = require("../models/trade");
const router = express.Router();

router.get("/", async (req, res) => {
  const trade = await Trade.find();
  res.send(trade);
});

router.get("/returns", (req, res) => {
  res.send("portfolio returns");
});

module.exports = router;

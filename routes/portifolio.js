const express = require("express");
const Trade = require("../models/trade");
const router = express.Router();

//routes for /portfolio
router.get("/fetch-portfolio/:portfolio_id", async (req, res) => {
  const trade = await Trade.find({portfolio_id: req.params.portfolio_id}).select("-_id -portfolio_id -trade_type -__v");
  res.send(trade);
});

router.get("/fetch-trades/:portfolio_id", async (req, res) => {
  try {
    const trade = await Trade.find({portfolio_id: req.params.portfolio_id}).select("-_id -portfolio_id -trade_type -__v");
    res.send(trade);
  } catch (err) {
    res.send(err);
  }
});

router.get("/returns/:portfolio_id", (req, res) => {
  res.send("portfolio returns");
});

module.exports = router;

const express = require("express");
const Trade = require("../models/trade");
const portfolioHelper = require("../helper/portfolioHelper");
const router = express.Router();

//routes for /portfolio
router.get("/fetch-portfolio/:portfolio_id", async (req, res) => {
  const trade = await Trade.find({
    portfolio_id: req.params.portfolio_id,
  })
    .select("-_id -portfolio_id -__v")
    .catch((err) => {
      return res.send(err["message"]);
    });

  const result = portfolioHelper.portfolioAggregator(trade);
  return res.send(result);
});

router.get("/fetch-trades/:portfolio_id", async (req, res) => {
  try {
    const trade = await Trade.find({
      portfolio_id: req.params.portfolio_id,
    })
      .select("-_id -portfolio_id -__v")
      .catch((err) => {
        return res.send(err["message"]);
      });
    return res.send(trade);
  } catch (err) {
    return res.send(err);
  }
});

router.get("/returns/:portfolio_id", async (req, res) => {
  const trade = await Trade.find({
    portfolio_id: req.params.portfolio_id,
  })
    .select("-_id -portfolio_id -__v")
    .catch((err) => {
      return res.send(err["message"]);
    });
  const returns = portfolioHelper.calculateReturns(trade);
  return res.send(returns.toString());
});

module.exports = router;

const express = require("express");
const Trade = require("../models/trade");
const portfolioHelper = require("../helper/portfolioHelper");
const router = express.Router();

// refer API documentation : API 8
router.get("/all", async (req, res) => {
  const trade = await Trade.find();
  return res.send(trade);
});

// refer API documentation : API 2
router.post("/add-trade/", async (req, res) => {
  const { error } = await portfolioHelper.validateTrade(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.body.trade_type === "SELL") {
    const current_portfolio = await Trade.find({
      portfolio_id: req.body.portfolio_id,
    })
      .select("-_id -portfolio_id -__v")
      .catch((err) => {
        return res.status(400).send(err["message"]);
      });

    const result = await portfolioHelper.portfolioAggregator(current_portfolio);

    for (let i = 0; i < result.length; i++) {
      if (result[i]["ticker_name"] === req.body.ticker_name) {
        if (result[i]["share_count"] - req.body.share_count < 0) {
          return res.status(400).send("share count cannot be negative");
        } else {
          let trade = new Trade({
            portfolio_id: req.body.portfolio_id,
            trade_type: req.body.trade_type,
            ticker_name: req.body.ticker_name,
            share_count: req.body.share_count,
            buying_price: req.body.buying_price,
          });
          trade = await trade.save().catch((err) => {
            return res.status(400).send(err["message"]);
          });
          return res.send(trade);
        }
      }
    }
    res.status(400).send("share count cannot be negative");
  } else {
    let trade = new Trade({
      portfolio_id: req.body.portfolio_id,
      trade_type: req.body.trade_type,
      ticker_name: req.body.ticker_name,
      share_count: req.body.share_count,
      buying_price: req.body.buying_price,
    });
    trade = await trade.save().catch((err) => {
      return res.send(err["message"]).status(400);
    });
    return res.send(trade);
  }
});

// refer API documentation : API 3
router.put("/update-trade/:id", async (req, res) => {
  const { error } = await portfolioHelper.validateTrade(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.body.trade_type === "SELL") {
    const current_portfolio = await Trade.find({
      portfolio_id: req.body.portfolio_id,
    })
      .select("-_id -portfolio_id -__v")
      .catch((err) => {
        return res.send(err["message"]);
      });

    const result = await portfolioHelper.portfolioAggregator(current_portfolio);

    for (let i = 0; i < result.length; i++) {
      if (result[i]["ticker_name"] === req.body.ticker_name) {
        if (result[i]["share_count"] - req.body.share_count < 0) {
          return res.status(400).send("share count cannot be negative");
        } else {
          let trade = new Trade({
            portfolio_id: req.body.portfolio_id,
            trade_type: req.body.trade_type,
            ticker_name: req.body.ticker_name,
            share_count: req.body.share_count,
            buying_price: req.body.buying_price,
          });
          trade = await trade.save().catch((err) => {
            return res.status(400).send(err["message"]);
          });
          return res.send(trade);
        }
      }
    }
    return res.status(400).send("share count cannot be negative");
  } else {
    const trade = await Trade.findByIdAndUpdate(
      req.params.id,
      {
        portfolio_id: req.body.portfolio_id,
        trade_type: req.body.trade_type,
        ticker_name: req.body.ticker_name,
        share_count: req.body.share_count,
        buying_price: req.body.buying_price,
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("failed updating");
        }
      }
    ).catch((err) => {
      return res.send(err["message"]).status(400);
    });
    return res.send(trade);
  }
});

// refer API documentation : API 4
router.delete("/remove-trade/:id", async (req, res) => {
  try {
    const trade = await Trade.findByIdAndRemove(req.params.id).catch((err) => {
      return res.send(err["message"]).status(400);
    });
    return res.send(trade);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;

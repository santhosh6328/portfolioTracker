const express = require("express");
const Trade = require("../models/trade");
const portfolioHelper = require("../helper/portfolioHelper");
const router = express.Router();

router.get("/all", async (req, res) => {
  const trade = await Trade.find();
  res.send(trade);
});

router.post("/add-trade/", async (req, res) => {
  if (req.body.trade_type === "SELL") {
    const current_portfolio = await Trade.find({
      portfolio_id: req.body.portfolio_id,
    })
      .select("-_id -portfolio_id -__v")
      .catch((err) => {
        res.status(400).send(err["message"]);
      });

    const result = portfolioHelper.portfolioAggregator(current_portfolio);

    for (let i = 0; i < result.length; i++) {
      if (result[i]["ticker_name"] === req.body.ticker_name) {
        if (result[i]["share_count"] - req.body.share_count < 0) {
          res.status(400).send("share count cannot be negative");
          return;
        } else {
          let trade = new Trade({
            portfolio_id: req.body.portfolio_id,
            trade_type: req.body.trade_type,
            ticker_name: req.body.ticker_name,
            share_count: req.body.share_count,
            buying_price: req.body.buying_price,
          });
          trade = await trade.save().catch((err) => {
            res.status(400).send(err["message"]);
            return;
          });
          res.send(trade);
          return
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
      res.send(err["message"]).status(400);
    });
    res.send(trade);
  }
});

router.put("/update-trade/:id", async (req, res) => {
  if (req.body.trade_type === "SELL") {
    const current_portfolio = await Trade.find({
      portfolio_id: req.body.portfolio_id,
    })
      .select("-_id -portfolio_id -__v")
      .catch((err) => {
        res.send(err["message"]);
      });

    const result = portfolioHelper.portfolioAggregator(current_portfolio);

    for (let i = 0; i < result.length; i++) {
      if (result[i]["ticker_name"] === req.body.ticker_name) {
        if (result[i]["share_count"] - req.body.share_count < 0) {
          res.status(400).send("share count cannot be negative");
          return;
        } else {
          let trade = new Trade({
            portfolio_id: req.body.portfolio_id,
            trade_type: req.body.trade_type,
            ticker_name: req.body.ticker_name,
            share_count: req.body.share_count,
            buying_price: req.body.buying_price,
          });
          trade = await trade.save().catch((err) => {
            res.status(400).send(err["message"]);
            return;
          });
          res.send(trade);
          return;
        }
      }
    }
    res.status(400).send("share count cannot be negative");
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
      res.send(err["message"]).status(400);
    });
    res.send(trade);
  }
});

router.delete("/remove-trade/:id", async (req, res) => {
  try {
    const trade = await Trade.findByIdAndRemove(req.params.id).catch((err) => {
      res.send(err["message"]).status(400);
    });
    res.send(trade);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

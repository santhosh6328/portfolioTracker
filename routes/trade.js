const express = require("express");
const Trade = require("../models/trade");
const router = express.Router();

router.get("/all", async (req, res) => {
  const trade = await Trade.find();
  res.send(trade);
});

router.post("/add-trade/", async (req, res) => {
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
});

router.put("/update-trade/:id", async (req, res) => {
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
  ).catch(err => {res.send(err["message"]).status(400)});
  res.send(trade);
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

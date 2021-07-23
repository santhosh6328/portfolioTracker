const express = require("express");
const Trade = require("../models/trade");
const router = express.Router();

router.post("/add-trade", async (req, res) => {
  try {
    let trade = new Trade({
      portfolio_id: req.body.portfolio_id,
      trade_type: req.body.trade_type,
      ticker_name: req.body.ticker_name,
      share_count: req.body.share_count,
      buying_price: req.body.buying_price,
    });
    trade = await trade.save();
    res.send(trade);
  } catch (error) {
    res.send(error._message);
    console.log(error);
  }
});

router.put("/update-trade/:id", async (req, res) => {
  try {
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
    );
    res.send(trade);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/remove-trade/:id", async (req, res) => {
  try {
    const trade = await Trade.findByIdAndRemove(req.params.id);

    if (!trade)
      return res.status(404).send("The trade with the given ID was not found.");

    res.send(trade);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

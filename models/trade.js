const mongoose = require("mongoose");
const Joi = require("joi");

const Trade = mongoose.model(
  "Trade",
  new mongoose.Schema({
    portfolio_id: {
      type: String,
      required: true,
    },
    trade_type: {
      type: String,
      required: true,
      enum: ["BUY", "SELL"],
    },
    ticker_name: {
      type: String,
      required: true,
    },
    share_count: {
      type: Number,
      required: true,
      min: 1,
    },
    buying_price: {
      type: Number,
      required: true,
      min: 1,
    },
  })
);

module.exports = Trade;

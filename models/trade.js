const mongoose = require("mongoose");
const Joi = require("joi");

const Trade = mongoose.model(
  "Trade",
  new mongoose.Schema({
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

function validateTrade(trade) {
  const schema = {
    trade_type: Joi.string().min(3).max(4).required(),
    ticker_name: Joi.string().min(1).required(),
    share_count: Joi.number().required(),
    buying_price: Joi.number().required(),
  };
  return Joi.validate(trade, schema);
}

module.exports = Trade;

const Joi = require("joi");
const CURRENT_MARKET_PRICE = 100;

function portfolioAggregator(data) {
  /*
  Function merges multiple  trades that happens on the same Security
  and updates the average buying price and total share count.
  input: Array of trade entry json objects
  output: Array of trade entries with unique ticker_name
  */
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (
      result.filter((e) => e.ticker_name === data[i].ticker_name).length > 0
    ) {
      // security is already present in results array
      for (let j = 0; j < result.length; j++) {
        if (data[i].ticker_name === result[j].ticker_name) {
          if (data[i]["trade_type"] === "BUY") {
            result[j]["buying_price"] = averageBuyingPrice(
              result[j]["share_count"],
              result[j]["buying_price"],
              data[i]["share_count"],
              data[i]["buying_price"]
            );
            result[j]["share_count"] =
              result[j]["share_count"] + data[i]["share_count"];
          } else {
            result[j]["share_count"] =
              result[j]["share_count"] - data[i]["share_count"];
            result[j]["buying_price"] = result[j]["buying_price"];
          }
        }
      }
    } else {
      // If the security is not already present
      let security = {};
      security["ticker_name"] = data[i]["ticker_name"];
      security["share_count"] = data[i]["share_count"];
      security["buying_price"] = data[i]["buying_price"];
      security["trade_type"] = data[i]["trade_type"];
      result.push(security);
    }
  }
  return result;
}

function calculateReturns(portfolio) {
  /*
  Return is calculated on the current trades in given portfolio
  input: Array of trade entry json objects
  output: Actual returns of the portfolio in Integer
  */
  let total = 0;
  for (let i = 0; i < portfolio.length; i++) {
    total =
      total +
      (CURRENT_MARKET_PRICE - portfolio[i]["buying_price"]) *
        portfolio[i]["share_count"];
  }
  return total;
}

function averageBuyingPrice(
  current_share_count,
  current_share_price,
  trade_count,
  trade_price
) {
  /*
  Calculates the average buying price.
  */
  return (
    (current_share_price * current_share_count + trade_price * trade_count) /
    (current_share_count + trade_count)
  );
}

function validateTrade(trade) {
  /*
  Joi schema to validate the user input at runtime
  */
  const schema = Joi.object({
    portfolio_id: Joi.number().required(),
    trade_type: Joi.string().min(3).max(4).required(),
    ticker_name: Joi.string().min(1).required(),
    share_count: Joi.number().required(),
    buying_price: Joi.number().required(),
  });
  return schema.validate(trade);
}

module.exports = { portfolioAggregator, calculateReturns, validateTrade };

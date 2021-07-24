const CURRENT_MARKET_PRICE = 100;

function portfolioAggregator(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (
      result.filter((e) => e.ticker_name === data[i].ticker_name).length > 0
    ) {
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
  return (
    (current_share_price * current_share_count + trade_price * trade_count) /
    (current_share_count + trade_count)
  );
}

module.exports = { portfolioAggregator, calculateReturns };

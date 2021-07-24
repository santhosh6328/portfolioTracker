const portfolioHelper = require("../../helper/portfolioHelper");

describe("portfolioHelper.func", () => {
  it("should be return positive average buying price", () => {
    let result = portfolioHelper.calculateReturns([
      {
        ticker_name: "ITC",
        share_count: 10,
        buying_price: 90,
        trade_type: "BUY",
      },
      {
        ticker_name: "SAN",
        share_count: 2,
        buying_price: 80,
        trade_type: "SELL",
      },
    ]);
    expect(result).toBe(140);
  });

  it("should be return negative average buying price", () => {
    let result = portfolioHelper.calculateReturns([
      {
        ticker_name: "ITC",
        share_count: 10,
        buying_price: 900,
        trade_type: "BUY",
      },
      {
        ticker_name: "SAN",
        share_count: 2,
        buying_price: 80,
        trade_type: "SELL",
      },
    ]);
    expect(result).toBe(-7960);
  });
});

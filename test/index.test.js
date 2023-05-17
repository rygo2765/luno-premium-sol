beforeEach(() => {
    jest.resetModules(); //reset module mocks before each test
  });
  
  import calc from "../lib/calculations.js";
  
  test("Shows premium in console if all good", async () => {
    const {calculatePremium} = require("../index.js");
  
    //Mock Luno Price
    const MOCK_LUNO_PRICE = 91000;
    jest.mock("../lib/luno.js", () => {
      return {
        fetchBTCMYR() {
          return new Promise((res) => {
            res(MOCK_LUNO_PRICE);
          });
        },
      };
    });
  
    //Mock Exchange Rate
    const MOCK_RATE = 4.5;
    jest.mock("../lib/exchange-rate.js", () => {
      return function exchangeRate() {
        return new Promise((res) => {
          res(MOCK_RATE);
        });
      };
    });
  
    //Mock Binance Price
    const MOCK_BINANCE_PRICE = 20000;
    jest.mock("../lib/binance.js", () => {
      return {
        getBinancePrice() {
          return new Promise((res) => {
            res(MOCK_BINANCE_PRICE);
          });
        },
      };
    });
  
    let prices = await calc(MOCK_LUNO_PRICE, MOCK_RATE, MOCK_BINANCE_PRICE);
  
    //Replace original console.log with a mock function provided by Jest
    console.log = jest.fn(() => undefined);
    await calculatePremium();
  
    //check that console.log function was called with the provided arguments in the specified order
    expect(console.log).toHaveBeenCalledWith("BTCMYR price on Luno:".padEnd(30), "MYR", MOCK_LUNO_PRICE);
    expect(console.log).toHaveBeenCalledWith("USDMYR:".padEnd(34), MOCK_RATE);
    expect(console.log).toHaveBeenCalledWith("BTCUSD price on Luno:".padEnd(30), "USD", prices.btcLunoUSD);
    expect(console.log).toHaveBeenCalledWith("BTCUSD price on Binance:".padEnd(30), "USD", MOCK_BINANCE_PRICE);
    expect(console.log).toHaveBeenCalledWith("Price difference:".padEnd(30), "USD", prices.priceDiff);
    expect(console.log).toHaveBeenCalledWith("Luno premium:".padEnd(34), prices.percentDiff + "%");
  });
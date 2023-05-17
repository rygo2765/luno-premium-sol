import Binance from "node-binance-api";
const binance = new Binance();

export async function getBinancePrice() {
  try {
    let binanceTicker = await binance.prices();
    let price = +binanceTicker.BTCBUSD;

    //test to ensure that price returned is a finite number
    if (Number.isFinite(price) === true) {
      let btcBinanceUSD = price;
      return btcBinanceUSD;
    } else {
      //if price returned is not a finite number, throw error and trigger catch
      throw "Fetch failed";
    }
  } catch (err) {
    //use catch (err) to catch abnormal or unexpected cases
    if (err === "Fetch failed") {
      return "Failed to retrieve price";
    }
    throw err;
  }
}
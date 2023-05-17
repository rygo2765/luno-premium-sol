import Binance from "node-binance-api";
const binance = new Binance();

export async function getBinancePrice() {
  try {
    const binanceTicker = await binance.prices();
    const price = +binanceTicker.BTCBUSD;

    //test to ensure that price returned is a finite number
    if (Number.isFinite(price) === true) {
      return price;
    } else {
      //if price returned is not a finite number, throw error and trigger catch
      throw new Error('Fetch failed');
    }
  } catch (err) {
    //use catch (err) to catch abnormal or unexpected cases
    if (err.message == 'Fetch failed') {
      return "Failed to retrieve price";
    }
    throw err;
  }
}
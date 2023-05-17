import { getBinancePrice } from "../lib/binance.js";
import exchangeRate from "../lib/exchange-rate.js";
import lunoPrice from "../lib/luno.js";
import calculations from "../lib/calculations.js";

//Calculate BTCUSD price from Luno, price diff & premium
export async function calculatePremium() {
  try {
    //Fetch prices from Luno
    const btcLunoMYR = await lunoPrice.fetchBTCMYR();
    if (typeof btcLunoMYR !== "number") {
      throw "Data retrieved from Luno is not a number";
    }

    //Fetch conversion rate from Fixer API
    const convRate = await exchangeRate();
    if (typeof convRate !== "number") {
      throw "Conversion rate retrieved is not a number";
    }

    //Fetch Binance BTC-USD price
    const btcBinanceUSD = await getBinancePrice();
    if (typeof btcBinanceUSD !== "number") {
      throw "Data retrieved from Binance is not a number";
    }

    //Calculate Luno's BTC price in USD, price difference and premium
    const { btcLunoUSD, priceDiff, percentDiff } = await calculations(
      btcLunoMYR,
      convRate,
      btcBinanceUSD
    );

    console.log("BTCMYR price on Luno:".padEnd(30), "MYR", btcLunoMYR);
    console.log("USDMYR:".padEnd(34), convRate);
    console.log("BTCUSD price on Luno:".padEnd(30), "USD", btcLunoUSD);
    console.log("BTCUSD price on Binance:".padEnd(30), "USD", btcBinanceUSD);
    console.log("Price difference:".padEnd(30), "USD", priceDiff);
    console.log("Luno premium:".padEnd(34), percentDiff + "%");
  } catch (error) {
    console.error(error);
  }
}
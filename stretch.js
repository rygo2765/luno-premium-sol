import Binance from 'node-binance-api'
const binance = new Binance();
import readline from 'readline'
import dotenv from "dotenv";
dotenv.config();

let i = 1;

//Use readline module to create interface allowing user to input data in terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Retrieve the price of a cryptocurrency on Luno
async function fetchLunoPrice(symbol) {
  let symbolFormatted;
  if (symbol === "BTC") {
    symbolFormatted = "XBT";
  } else {
    symbolFormatted = symbol;
  }
  const res = await fetch(`https://api.luno.com/api/1/ticker?pair=${symbolFormatted}MYR`);
  const data = await res.json();
  return data.last_trade;
}

//Retrieve USDMYR conversion rate
async function fetchConv() {
  let myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_KEY);

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response = await fetch(
    "https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD",
    requestOptions
  );
  const USDMYR = await response.json();
  return USDMYR.rates["MYR"];
}

//Retrieve the price of a cryptocurrency on Binance
async function fetchBinancePrice(crypto) {
  const ticker = await binance.prices(`${crypto}BUSD`);
  return ticker[`${crypto}BUSD`];
}

//Calculate the premium for a given cryptocurrency
async function calculatePremium(crypto) {
  try {
    const lunoPrice = await fetchLunoPrice(crypto);
    console.log(`Luno price for ${crypto} in MYR:`.padEnd(30),"MYR",lunoPrice);

    const convRate = await fetchConv();
    console.log("USDMYR:".padEnd(34), convRate);

    //Convert Luno Price from MYR to USD
    const lunoUsdPrice = lunoPrice / convRate;
    console.log(`Luno price for ${crypto} in USD:`.padEnd(30),"USD",lunoUsdPrice);

    const binancePrice = await fetchBinancePrice(crypto);
    console.log(`Binance price for ${crypto} in USD:`.padEnd(30),"USD",binancePrice);

    const priceDiff = Math.abs(lunoUsdPrice - binancePrice);
    const percentDiff = ((priceDiff / lunoUsdPrice) * 100).toFixed(2);

    console.log(`Price difference for ${crypto}:`.padEnd(30), "USD", priceDiff);
    console.log(`Luno premium for ${crypto}:`.padEnd(30), percentDiff + "%");
    console.log("Call #", i)
    console.log("-------------------------------------------------------------")
  } catch (error) {
    console.error(error);
  }
}

rl.question("Enter a cryptocurrency: ", async function (answer) {
  const crypto = answer.toUpperCase();

  while (true) {
    console.log(`Fetching data for ${crypto}...`)
    await calculatePremium(crypto);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    i++
  }
});

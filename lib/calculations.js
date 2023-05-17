export default async function calc(btcLunoMYR, convRate, btcBinanceUSD) {
    let btcLunoUSD = btcLunoMYR / convRate;
    let priceDiff = Math.abs(btcLunoUSD - btcBinanceUSD);
    let percentDiff = (priceDiff / btcLunoUSD) * 100;
    percentDiff = +percentDiff.toFixed(2);
  
    return {
      btcLunoUSD: btcLunoUSD,
      priceDiff: priceDiff,
      percentDiff: percentDiff,
    };
  }
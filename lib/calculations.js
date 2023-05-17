export default async function calc(btcLunoMYR, convRate, btcBinanceUSD) {
    const btcLunoUSD = btcLunoMYR / convRate;
    const priceDiff = Math.abs(btcLunoUSD - btcBinanceUSD);
    const percentDiff = (priceDiff / btcLunoUSD) * 100;
    const adjustedPercentDiff = +percentDiff.toFixed(2);
  
    return {
      btcLunoUSD: btcLunoUSD,
      priceDiff: priceDiff,
      percentDiff: adjustedPercentDiff,
    };
  }
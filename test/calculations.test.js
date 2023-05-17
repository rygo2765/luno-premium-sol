import premiumCalc  from '../lib/calculations.js'

//test for correct calculated values
test("Returns the correct calculated values", async () => {
    expect(await premiumCalc(10, 2, 3)).toEqual({
        'btcLunoUSD': 5,
        'priceDiff': 2,
        'percentDiff': 40.00,
    });
});
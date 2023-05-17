import convRate from '../lib/exchange-rate.js'

//test for a succesful fetch response of conversion rate from Fixer API
test("Returns the correct conversion rate", async () => {
    const MOCK_RATE = 4.5
    const MOCK_JSON_RESP = {
        rates:
            { MYR: MOCK_RATE }
    }
    //Substitutes line 11 - line 13 into exchange-rate.js response object. Will only contain status and rates
    global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(MOCK_JSON_RESP)
    }))

    expect(await convRate()).toBe(MOCK_RATE)
})

//test for a unsuccesful fetch response of conversion rate from Fixer API
test("Returns an error in retrieving conversion rate", async () => {
    const MOCK_STATUS_CODE = 500

    global.fetch = jest.fn(() => Promise.resolve({
        status: MOCK_STATUS_CODE,
        json: () => { }
    }));
    expect(await convRate()).toBe("Failed to retrieve conversion rate");
});
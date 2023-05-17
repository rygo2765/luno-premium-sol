async function fetchBTCMYR(y) {
    try {
        const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")
        if (response.status === 200) {
            const BTCMYR = await response.json()
            return +BTCMYR['last_trade']
        } else {
            throw "Fetch failed"
        }
    } catch (err) { //use catch (err) to catch abnormal or unexpected cases i.e. response.status === 200 but BTCMYR['last_trade'] doesn't return value
        if (err == "Fetch failed") {
            return "Failed to retrieve price"
        }
        throw err //crash the application if we got an unexpected error 
    }


}

export default { fetchBTCMYR }
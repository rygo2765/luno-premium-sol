export default async function fetchConv() {
  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      "https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD",
      requestOptions
    );
    if (response.status === 200) {
      const USDMYR = await response.json();
      return USDMYR.rates.MYR;
    }
    throw new Error("Fetch failed");
  } catch (err) {
    if (err.message == "Fetch failed") {
      return "Failed to retrieve conversion rate";
    }
    throw err;
  }
}

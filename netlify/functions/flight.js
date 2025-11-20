export async function handler(event, context) {
    const dest = event.queryStringParameters.city;

    const tokenRes = await fetch("/.netlify/functions/token");
    const { access_token } = await tokenRes.json();

    const res = await fetch(
        `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=${dest}&departureDate=2025-03-12&adults=1&max=5`,
        { headers: { Authorization: `Bearer ${access_token}` }}
    );

    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
}
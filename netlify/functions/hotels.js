export async function handler(event, context) {
    const lat = event.queryStringParameters.lat;
    const lon = event.queryStringParameters.lon;

    const tokenRes = await fetch("/.netlify/functions/token");
    const { access_token } = await tokenRes.json();

    const res = await fetch(
        `https://api.amadeus.com/v2/shopping/hotel-offers?latitude=${lat}&longitude=${lon}&radius=10`,
        { headers: { Authorization: `Bearer ${access_token}` }}
    );

    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
}
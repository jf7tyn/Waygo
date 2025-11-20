export async function handler(event, context) {
    const CLIENT_ID = "ZDogSkh8LUuaB7SZAVKh6P7eNX1rsZ28";
    const CLIENT_SECRET = "GiksiAfQzHdSMvbG";

    const destination = event.queryStringParameters.city; // уже IATA
    const origin = "PAR";

    if (!destination) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing destination code" })
        };
    }

    if (origin === destination) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Impossible de chercher un vol Paris → Paris."
            })
        };
    }

    try {
        const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });

        const token = await tokenRes.json();
        const accessToken = token.access_token;

        const flightRes = await fetch(
            `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=2025-03-12&adults=1&max=3`,
            { headers: { Authorization: `Bearer ${accessToken}` }}
        );

        const data = await flightRes.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
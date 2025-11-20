export async function handler(event, context) {
    const CLIENT_ID = "ZDogSkh8LUuaB7SZAVKh6P7eNX1rsZ28";
    const CLIENT_SECRET = "GiksiAfQzHdSMvbG";

    const cityCode = event.queryStringParameters.city;

    if (!cityCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing city parameter" })
        };
    }

    try {
        // Токен
        const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Отели
        const hotelRes = await fetch(
            `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`,
            { headers: { Authorization: `Bearer ${accessToken}` }}
        );

        const data = await hotelRes.json();

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
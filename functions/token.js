import fetch from "node-fetch";

export async function handler(event, context) {
    const CLIENT_ID = "ZDogSkh8LUuaB7SZAVKh6P7eNX1rsZ28";
    const CLIENT_SECRET = "GiksiAfQzHdSMvbG";

    const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });

    const data = await res.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}
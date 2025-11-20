export async function handler(event, context) {

    const CLIENT_ID = "PLiaPCeZAdJ8fEGaBO39TaCLWxDbm4zn";
    const CLIENT_SECRET = "eUHgyfDhySyuWYRG";

    const res = await fetch("https://api.amadeus.com/v1/security/oauth2/token", {
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
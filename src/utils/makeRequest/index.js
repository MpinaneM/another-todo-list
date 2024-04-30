async function makeRequest(uri, method = "GET", body = null) {
    try {
        const response = await fetch(uri, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export default makeRequest;

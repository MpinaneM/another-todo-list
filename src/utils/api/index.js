import { envConfig } from "@/env.config";

const { tasksBaseUrl, identityKitBaseUrl, apiKey } = envConfig;

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

export async function postAuthUser(email, password, mode) {
    const action = mode === "signup" ? "signUp" : "signInWithPassword";
    try {
        const response = await makeRequest(
            `${identityKitBaseUrl}:${action}?key=${apiKey}`,
            "POST",
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getTasks(idToken, userId) {
    try {
        const response = await makeRequest(
            `${tasksBaseUrl}.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export async function postAddTask(idToken, task) {
    try {
        await makeRequest(`${tasksBaseUrl}.json?auth=${idToken}`, "POST", task);
    } catch (error) {
        throw error;
    }
}

export async function deleteTask(idToken, taskId) {
    try {
        await makeRequest(
            `${tasksBaseUrl}/${taskId}.json?auth=${idToken}`,
            "DELETE"
        );
    } catch (error) {
        throw error;
    }
}

export async function patchUpdateTask(idToken, taskId, updatedTask) {
    try {
        await makeRequest(
            `${tasksBaseUrl}/${taskId}.json?auth=${idToken}`,
            "PATCH",
            updatedTask
        );
    } catch (error) {
        throw error;
    }
}

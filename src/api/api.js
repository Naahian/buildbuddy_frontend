import { TokenService } from "../services/auth.js"
const BASE_URL = "https://buildbuddy-backend-rjr8.onrender.com"; // update for deployed backend

export const API = {
    welcome: () => {
        return fetch(`${BASE_URL}/`);
    },

    // USER
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const tokens = await response.json();
            TokenService.setTokens(tokens);
        }

        return response;
    },

    logout: async () => {
        const accessToken = TokenService.getAccessToken();
        const refreshToken = TokenService.getRefreshToken();

        try {
            const response = await fetch(`${BASE_URL}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    refresh_token: refreshToken
                })
            });

            // Try to parse JSON, but handle cases where response isn't JSON
            let json;
            try {
                json = await response.json();
            } catch (e) {
                console.log("Response wasn't JSON:", await response.text());
                return response;
            }

            // Clear tokens regardless of server response
            TokenService.clearTokens();
            return response;
        } catch (error) {
            console.error("Logout error:", error);
            // Clear tokens on client side even if server request fails
            TokenService.clearTokens();
            throw error;
        }
    },

    getCurrentUser: () => authorizedFetch(`${BASE_URL}//users/profile`),

    getUsers: () => authorizedFetch(`${BASE_URL}/users`),


    createUser: async (data) => {
        const response = await fetch(`${BASE_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response;
    },


    deleteUser: (id) => authorizedFetch(`${BASE_URL}/users/${id}`, 'DELETE'),


    // PROJECT
    createProject: (data) => authorizedFetch(`${BASE_URL}/projects/`, 'POST', data),

    getProjects: async function (id = null) {
        if (id) {
            return fetch(`${BASE_URL}/projects?id=${id}`).then(res => res.json());
        } else {
            return fetch(`${BASE_URL}/projects/`).then(res => res.json());
        }
    },

    deleteProject: (id) => fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE"
    }),


    // COMPONENT
    createComponent: (data) => authorizedFetch(`${BASE_URL}/components/`, 'POST', data),

    getComponents: async function (id = null) {
        if (id) {
            return fetch(`${BASE_URL}/components?id=${id}`).then(res => res.json());
        } else {
            return fetch(`${BASE_URL}/components/`).then(res => res.json());
        }
    },

    deleteComponent: (id) => authorizedFetch(`${BASE_URL}/components/${id}`, 'DELETE'),


    // ORDER
    createOrder: (data) => authorizedFetch(`${BASE_URL}/orders/`, 'POST', data),

    getOrders: () => authorizedFetch(`${BASE_URL}/orders/`),
    // fetch(`${BASE_URL}/orders/`).then(res => res.json()),
    deleteOrder: (id) => authorizedFetch(`${BASE_URL}/orders/${id}`, 'DELETE'),







    //--------------------------- OTHERS ----------------------------

    buddyAiPromt: async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };

        const response = await fetch("http://127.0.0.1:5000//buddyai/send_prompt", requestOptions)
        return response.json();
    },



    refreshAccessToken: async () => {
        const refresh_token = TokenService.getRefreshToken();
        console.log("Using refresh token:", refresh_token);
        if (!refresh_token) return false;

        const response = await fetch(`${BASE_URL}/users/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Flask-JWT-Extended expects "Bearer <token>" format
                "Authorization": `Bearer ${refresh_token}`
            }
        });

        if (response.ok) {
            const tokens = await response.json();
            console.log("New tokens received:", tokens);
            TokenService.setTokens(tokens);
            return true;
        } else {
            console.error("Token refresh failed:", await response.text());
            return false;
        }
    },

};


const authorizedFetch = async (url, method = 'GET', body = null, retry = true) => {

    const accessToken = TokenService.getAccessToken();
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };

    const options = {
        method: method,
        headers
    };


    // Only attach body if it's not null and method is not GET/HEAD
    if (body && method !== 'GET' && method !== 'HEAD') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const json = await response.json();
    if (json && json.msg === "Token has expired") {
        const refreshed = await API.refreshAccessToken();
        if (refreshed) {
            return await fetch(url, options);
            window.location.reload();
        }
    }

    return json;
};




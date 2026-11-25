import axios from "axios";

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
    timeout: 15000,
    withCredentials: true,
});

// Future HTTP services use this client.
// Mock services below never make network requests.

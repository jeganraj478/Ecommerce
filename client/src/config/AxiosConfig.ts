import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
export const AxiosConfig = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
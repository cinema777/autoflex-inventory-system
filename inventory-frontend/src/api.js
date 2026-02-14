import axios from 'axios';

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080' 
    : 'https://autoflex-inventory-system.onrender.com/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
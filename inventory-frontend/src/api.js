import axios from 'axios';

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080' 
    : 'https://sua-api-no-render.onrender.com';

export default API_URL;
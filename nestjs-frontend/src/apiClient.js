// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/wcbp', // Adjust the port number as needed
});

export default apiClient;

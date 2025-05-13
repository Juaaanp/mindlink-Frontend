import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090', // Cambiado al puerto correcto
  withCredentials: true,
});

export default api;

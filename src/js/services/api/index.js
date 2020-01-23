import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL
});

api.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.params = config.params || {};
  
  return config;
});

export default api;

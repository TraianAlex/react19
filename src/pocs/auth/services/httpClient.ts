import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 5000,
});

// Add an interceptor to include the auth token if it's available
httpClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('authToken') ?? import.meta.env.VITE_REQRES_X_API_KEY;

  if (token) {
    // config.headers!.Authorization = `Bearer ${token}`;
    config.headers!['x-api-key'] = token;
    config.headers!['Access-Control-Allow-Origin'] = '*';
  }

  return config;
});

export default httpClient;

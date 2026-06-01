import axios from 'axios';

import { reqresApiBase } from './reqresUrl';

const httpClient = axios.create({
  baseURL: reqresApiBase,
  timeout: 5000,
});

httpClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_REQRES_X_API_KEY;

  if (token) {
    config.headers!['x-api-key'] = token;
  }

  return config;
});

export default httpClient;

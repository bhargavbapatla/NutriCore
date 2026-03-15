import axios from 'axios';

// The base URL for the server. In a real application, this should be in an environment variable.
const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can perform actions before the request is sent, e.g., logging or adding headers
    console.log(`[Request Interceptor] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Perform actions on successful response
    return response;
  },
  (error) => {
    // Handle global errors, e.g., unauthorized access
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - potential token expiration');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { BASE_URL };

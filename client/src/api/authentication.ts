import apiClient from './apiClient';

/**
 * Authentication API endpoints
 */
export const signup = async (userData: any) => {
  try {
    const response = await apiClient.post('/auth/signup', userData);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    // Propagate error details for the UI to handle
    throw error.response?.data || error.message || 'An error occurred during signup';
  }
};

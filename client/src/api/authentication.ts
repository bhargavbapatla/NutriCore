import apiClient from './apiClient';

/**
 * Authentication API endpoints
 */
export const signup = async (userData: any) => {
  try {
    const response = await apiClient.post('/auth/signup', userData);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred during signup';
  }
};

export const login = async (userData: any) => {
  try {
    const response = await apiClient.post('/auth/login', userData);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred during login';
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred fetching user data';
  }
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error: any) {
    console.error('Logout failed', error);
  }
};

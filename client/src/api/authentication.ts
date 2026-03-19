import apiClient from './apiClient';
import { signupUrl, loginUrl, meUrl, logoutUrl } from './urls';

/**
 * Authentication API endpoints
 */
export const signup = async (userData: any) => {
  try {
    const response = await apiClient.post(signupUrl, userData);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred during signup';
  }
};

export const login = async (userData: any) => {
  try {
    const response = await apiClient.post(loginUrl, userData);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred during login';
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get(meUrl);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred fetching user data';
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post(logoutUrl);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw error.response?.data || error.message || 'An error occurred during logout';
  }
};

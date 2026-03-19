import apiClient from './apiClient';
import { profileUrl } from './urls';


export const postQuestionaire = async (userData: any) => {
    try {
        const response = await apiClient.post(profileUrl, userData);
        return { data: response.data, status: response.status };
    } catch (error: any) {
        throw error.response?.data || error.message || 'An error occurred during questionaire';
    }
};



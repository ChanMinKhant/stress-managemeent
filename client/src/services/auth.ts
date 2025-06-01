import apiService from './api';

const authBaseUrl = 'api/auth';

export const register = async (userData: any) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const login = async (userData: any) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/login`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};
export const logout = async () => {
  try {
    const response = await apiService.post(`${authBaseUrl}/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const getUser = async () => {
  try {
    const response = await apiService.post(`${authBaseUrl}/get-user`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

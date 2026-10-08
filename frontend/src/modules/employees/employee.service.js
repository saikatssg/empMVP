import apiClient from '../../config/axiosInstance';

export const getEmployees = async (searchQuery = '') => {
  const params = searchQuery ? { search: searchQuery } : {};
  const response = await apiClient.get('/employees', { params });
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await apiClient.post('/employees', employeeData);
  return response.data;
};

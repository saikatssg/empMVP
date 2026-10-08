import apiClient from '../../config/axiosInstance';

export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (email, token, newPassword) => {
  const response = await apiClient.post('/auth/reset-password', { email, token, newPassword });
  return response.data;
};

export const triggerUpdateOtp = async () => {
  const response = await apiClient.post('/auth/trigger-update-otp');
  return response.data;
};

export const updateCredentials = async (otp, newPassword) => {
  const response = await apiClient.put('/auth/update-credentials', { otp, newPassword });
  return response.data;
};

export const deactivateUser = async (userId) => {
  const response = await apiClient.put(`/auth/deactivate/${userId}`);
  return response.data;
};

import axios from 'axios';
import { axiosWT } from '.';

const rootPath = '/auth';

export const register = async (payload) => {
  const response = await axios.post(`${rootPath}/sign-up`, payload);
  return response.data.data;
};

export const login = async (payload) => {
  await axios.post(`${rootPath}/sign-in`, payload);
};

export const verifyPassword = async (password) => {
  await axiosWT.post(`${rootPath}/verify-password`, { password });
};

export const resetPassword = async (payload) => {
  await axios.patch(`${rootPath}/reset-password`, payload);
};

export const refreshToken = async () => {
  const response = await axios.get(`${rootPath}/refresh-token`);
  return response.data.data;
};

export const logout = async () => {
  await axiosWT.delete(`${rootPath}`);
};

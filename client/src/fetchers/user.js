import axios from 'axios';
import { axiosWT } from './index';

const rootPath = '/users';

export const createUser = async (payload) => {
  const response = await axiosWT.post(`${rootPath}`, payload);
  return response.data.data;
};

export const getAllUser = async () => {
  const response = await axios.get(`${rootPath}`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosWT.get(`${rootPath}/${id}`);
  return response.data.data;
};

export const updateUserById = async (id, payload) => {
  const response = await axiosWT.patch(`${rootPath}/${id}`, payload);
  return response.data.data;
};

export const updatePasswordById = async (id, password) => {
  await axiosWT.patch(`${rootPath}/${id}/password`, { password });
};

export const deleteUserById = async (id) => {
  const response = await axiosWT.delete(`${rootPath}/${id}`);
  return response.data.data;
};

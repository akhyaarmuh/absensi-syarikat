import axios from 'axios';
import { axiosWT } from './index';

const rootPath = '/regions';

export const createRegion = async (payload) => {
  const response = await axiosWT.post(`${rootPath}`, payload);
  return response.data.data;
};

export const getAllRegion = async (queries) => {
  const response = await axios.get(`${rootPath}`, { params: queries });
  return response.data;
};

export const updateRegionById = async (payload) => {
  const response = await axiosWT.patch(`${rootPath}/${payload.id}`, {
    name: payload.name,
  });
  return response.data.data;
};

export const deleteRegionById = async (id) => {
  const response = await axiosWT.delete(`${rootPath}/${id}`);
  return response.data.data;
};

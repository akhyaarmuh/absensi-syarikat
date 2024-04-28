import axios from 'axios';
import { axiosWT } from './index';

const rootPath = '/events';

export const createEvent = async (payload) => {
  const response = await axiosWT.post(`${rootPath}`, payload);
  return response.data.data;
};

export const createAttendanceByIdEvent = async (id, payload) => {
  const response = await axios.post(`${rootPath}/${id}`, payload);
  return response.data.data;
};

export const getAllEvent = async (queries) => {
  const response = await axios.get(`${rootPath}`, { params: queries });
  return response.data;
};

export const updateEventById = async (payload) => {
  const response = await axiosWT.patch(`${rootPath}/${payload.id}`, {
    name: payload.name,
    type: payload.type,
    description: payload.description || '',
  });
  return response.data.data;
};

export const getAttendanceDetailsById = async (id, queries) => {
  const response = await axios.get(`${rootPath}/${id}/attendance-details`, {
    params: queries,
  });
  return response.data;
};

export const deleteEventById = async (id) => {
  const response = await axiosWT.delete(`${rootPath}/${id}`);
  return response.data.data;
};

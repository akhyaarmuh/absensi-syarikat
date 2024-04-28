import axios from 'axios';
import { axiosWT } from './index';

const rootPath = '/members';

export const createMember = async (payload) => {
  const response = await axiosWT.post(`${rootPath}`, payload);
  return response.data.data;
};

export const uploadImage = async (id, formData) => {
  await axiosWT.post(`${rootPath}/${id}/image`, formData, {
    headers: { 'Content-type': 'multipart-form-data' },
  });
};

export const getAllMember = async (queries) => {
  const response = await axios.get(`${rootPath}`, { params: queries });
  return response.data;
};

export const getMemberById = async (id) => {
  const response = await axios.get(`${rootPath}/${id}`);
  return response.data.data;
};

export const getAbsenDetailsMemberById = async (id) => {
  const response = await axios.get(`${rootPath}/${id}/absent-details`);
  return response.data.data;
};

export const updateMemberById = async (payload) => {
  const response = await axiosWT.patch(`${rootPath}/${payload.id}`, {
    no_induk: payload.no_induk,
    full_name: payload.full_name,
    father_name: payload.father_name,
    birth: payload.birth,
    address: payload.address,
    region_id: payload.region_id,
    status: payload.status || 'new',
  });
  return response.data;
};

export const updateStatusById = async (id) => {
  await axiosWT.patch(`${rootPath}/${id}/status`);
};

export const resetAbsentById = async (id, payload) => {
  await axiosWT.patch(`${rootPath}/${id}/absent`, payload);
};

export const deleteMemberById = async (id) => {
  await axiosWT.delete(`${rootPath}/${id}`);
};

export const deleteImageById = async (id) => {
  await axiosWT.delete(`${rootPath}/${id}/image`);
};

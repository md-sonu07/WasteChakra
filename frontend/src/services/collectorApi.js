import { request, qs } from './api';

export const collectorApi = {
  getAssignedPickups: (params = {}) => request(`/pickups/${qs(params)}`),
  getPickupDetail: (id) => request(`/pickups/${id}/`),
  updatePickupStatus: (id, data) => request(`/pickups/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  uploadPickupProof: (id, formData) => request(`/pickups/${id}/`, { method: 'PATCH', body: formData }),
  getProfile: () => request('/auth/profile/'),
  updateProfile: (data) => request('/auth/profile/', { method: 'PATCH', body: JSON.stringify(data) }),
  getImpact: () => request('/user/impact/'),
};

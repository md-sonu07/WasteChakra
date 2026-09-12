import { request, qs } from './api';

export const citizenApi = {
  createWasteReport: (formData) => request('/waste-reports/create/', { method: 'POST', body: formData }),
  getWasteReports: (params = {}) => request(`/waste-reports/${qs(params)}`),
  getWasteReport: (id) => request(`/waste-reports/${id}/`),

  createPickup: (data) => request('/pickups/create/', { method: 'POST', body: JSON.stringify(data) }),
  getPickups: (params = {}) => request(`/pickups/${qs(params)}`),
  getPickup: (id) => request(`/pickups/${id}/`),

  getImpact: () => request('/user/impact/'),
  getPassport: (id) => request(`/passports/${id}/`),

  processWasteImage: (file, source = 'UPLOAD') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('source', source);
    return request('/pipeline/process/', { method: 'POST', body: formData });
  },
};

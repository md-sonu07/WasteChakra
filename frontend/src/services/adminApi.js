import { request, qs } from './api';

export const adminApi = {
  getPickups: (params = {}) => request(`/pickups/${qs(params)}`),
  getPickup: (id) => request(`/pickups/${id}/`),
  assignCollector: (pickupId, collectorId) => request(`/pickups/${pickupId}/`, {
    method: 'PATCH',
    body: JSON.stringify({ collector: collectorId, status: 'ASSIGNED' }),
  }),
  updatePickup: (id, data) => request(`/pickups/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),

  getWasteReports: (params = {}) => request(`/waste-reports/${qs(params)}`),
  getWasteReport: (id) => request(`/waste-reports/${id}/`),

  getStatsSummary: () => request('/stats/summary/'),
  simulateWaste: (simParams) => request('/pipeline/simulate/', { method: 'POST', body: JSON.stringify(simParams) }),
  getWasteRecords: (params = {}) => request(`/records/${qs(params)}`),
  getDecisionConfig: () => request('/config/decision-rules/'),
  updateDecisionConfig: (fields) => request('/config/decision-rules/', { method: 'PATCH', body: JSON.stringify(fields) }),
};

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api/v1' : 'https://wastechakra.onrender.com/api/v1');

const TOKEN_KEY = 'wc_access_token';
const REFRESH_KEY = 'wc_refresh_token';
const USER_KEY = 'wc_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokens(access, refresh) {
  if (access) localStorage.setItem(TOKEN_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function request(path, options = {}, retry = true) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry && localStorage.getItem(REFRESH_KEY)) {
    const refreshed = await tryRefresh();
    if (refreshed) return request(path, options, false);
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const message = err.error || err.detail || (Array.isArray(err) ? err.map((e) => e.detail).join(', ') : 'Request failed');
    throw new Error(message);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return response;
}

async function tryRefresh() {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) {
      clearTokens();
      return false;
    }
    const data = await res.json();
    setTokens(data.access);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export const api = {
  // Auth
  register: (data) => request('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login/', { method: 'POST', body: JSON.stringify(data) }),
  profile: () => request('/auth/profile/'),
  updateProfile: (data) => request('/auth/profile/', { method: 'PATCH', body: JSON.stringify(data) }),

  // Waste reports
  createWasteReport: (formData) => request('/waste-reports/create/', { method: 'POST', body: formData }),
  getWasteReports: (params = {}) => request(`/waste-reports/${qs(params)}`),
  getWasteReport: (id) => request(`/waste-reports/${id}/`),

  // Pickups
  createPickup: (data) => request('/pickups/create/', { method: 'POST', body: JSON.stringify(data) }),
  getPickups: (params = {}) => request(`/pickups/${qs(params)}`),
  getPickup: (id) => request(`/pickups/${id}/`),
  updatePickup: (id, data) => request(`/pickups/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Passports
  getPassport: (id) => request(`/passports/${id}/`),

  // Impact
  getImpact: () => request('/user/impact/'),

  // Detection pipeline (existing)
  processWasteImage: (file, source = 'UPLOAD') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('source', source);
    return request('/pipeline/process/', { method: 'POST', body: formData });
  },
  simulateWaste: (simParams) => request('/pipeline/simulate/', { method: 'POST', body: JSON.stringify(simParams) }),
  getWasteRecords: (params = {}) => request(`/records/${qs(params)}`),
  getStatsSummary: () => request('/stats/summary/'),
  getDecisionConfig: () => request('/config/decision-rules/'),
  updateDecisionConfig: (fields) => request('/config/decision-rules/', { method: 'PATCH', body: JSON.stringify(fields) }),
};

function qs(params) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  const query = new URLSearchParams(clean).toString();
  return query ? `?${query}` : '';
}

export { API_BASE_URL };

// Convenience named exports (kept for backwards compatibility with the simulation)
export const getStatsSummary = (...args) => api.getStatsSummary(...args);
export const simulateWaste = (...args) => api.simulateWaste(...args);
export const processWasteImage = (...args) => api.processWasteImage(...args);
export const getWasteRecords = (...args) => api.getWasteRecords(...args);
export const getDecisionConfig = (...args) => api.getDecisionConfig(...args);
export const updateDecisionConfig = (...args) => api.updateDecisionConfig(...args);

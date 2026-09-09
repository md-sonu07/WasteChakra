import { api } from './api';
import { demo } from './demoData';

const USE_DEMO = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.VITE_DEMO_MODE === '1';

async function withFallback(apiCall, demoValue) {
  if (USE_DEMO) return demoValue;
  try {
    const data = await apiCall();
    return data.results !== undefined ? data.results : data;
  } catch {
    return demoValue || [];
  }
}

export const dataProvider = {
  async getPickups(params = {}) {
    return withFallback(() => api.getPickups(params), demo.pickups);
  },
  async getPickup(id) {
    return withFallback(() => api.getPickup(id), demo.pickups.find((p) => p.id === id) || demo.pickups.find((p) => p.pickup_id === id) || demo.pickups[0]);
  },
  async getWasteReports(params = {}) {
    return withFallback(() => api.getWasteReports(params), demo.reports);
  },
  async getPassport(id) {
    return withFallback(() => api.getPassport(id), { ...demo.passport, id: id || demo.passport.id });
  },
  async getImpact() {
    return withFallback(() => api.getImpact(), demo.impact);
  },
  async getEvents() {
    return demo.events;
  },
  async getRewards() {
    return demo.rewards;
  },
  async getLeaderboard() {
    return demo.leaderboard;
  },
  async getAchievements() {
    return demo.achievements;
  },
  async getNotifications() {
    return demo.notifications;
  },
};

export const labels = {
  wasteTypes: {
    MIXED: 'Mixed Waste', PLASTIC: 'Plastic', ORGANIC: 'Organic', PAPER: 'Paper',
    METAL: 'Metal', TEXTILE: 'Textile', E_WASTE: 'E-Waste', CONSTRUCTION: 'Construction Waste',
    BULK: 'Bulk Waste', HAZARDOUS: 'Hazardous Waste', RECYCLABLES: 'Recyclables', OTHER: 'Other',
  },
  status: {
    REQUESTED: 'Requested', CONFIRMED: 'Confirmed', ASSIGNED: 'Assigned', EN_ROUTE: 'En Route',
    ARRIVED: 'Arrived', COLLECTED: 'Collected', PROCESSING: 'Processing', COMPLETED: 'Completed',
    CANCELLED: 'Cancelled', REPORTED: 'Reported', PICKUP_SCHEDULED: 'Pickup Scheduled',
  },
};
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../config';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

const AUTH_PROFILE_ROUTES = ['/api/auth/me', '/api/auth/profile', '/api/auth/usuario'];

async function getFromFirstAvailableRoute(routes) {
  let lastError = null;

  for (const route of routes) {
    try {
      return await api.get(route);
    } catch (error) {
      const status = error?.response?.status;
      // Skip only missing route errors and continue trying known alternatives.
      if (status === 404) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error('No profile route available under /api/auth/**');
}

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  getProfile: async () => getFromFirstAvailableRoute(AUTH_PROFILE_ROUTES),
  getReports: () => api.get('/api/reportes'),
  getReport: id => api.get(`/api/reportes/${id}`),
  publishReport: data => api.post('/api/reportes', data),
  getGeo: params => api.get('/api/geo', { params }),
  getMatches: reportId => api.get('/api/coincidencias', { params: { reportId } }),
  getNotifications: () => api.get('/api/notificaciones'),
  uploadMedia: data => api.post('/api/storage', data),
  health: () => api.get('/actuator/health'),
  info: () => api.get('/actuator/info'),
  gatewayInfo: () => api.get('/actuator/gateway')
};
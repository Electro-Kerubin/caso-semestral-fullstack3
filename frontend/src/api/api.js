import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../config';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getReports: () => api.get('/reports'),
  getReport: id => api.get(`/reports/${id}`),
  publishReport: data => api.post('/reports', data),
  getMatches: reportId => api.get(`/matching?reportId=${reportId}`)
};
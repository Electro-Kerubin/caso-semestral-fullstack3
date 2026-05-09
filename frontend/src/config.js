// Lee variable de entorno para web; fallback para móvil local
const webEnv = typeof process !== 'undefined' && process.env.REACT_APP_API_BASE;
export const API_BASE = webEnv || 'http://192.168.1.100:8080/api';
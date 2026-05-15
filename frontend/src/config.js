// Gateway base URL. Routes are defined in api.js with `/api/...` prefixes.
const webEnv = typeof process !== 'undefined' && process.env.REACT_APP_API_BASE;
export const API_BASE = webEnv || 'http://localhost:8080';
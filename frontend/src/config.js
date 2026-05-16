// Single gateway base URL for local development and Vercel deployments.
const runtimeEnv = typeof process !== 'undefined'
	? process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.EXPO_PUBLIC_API_GATEWAY_URL || process.env.REACT_APP_API_BASE
	: undefined;

export const API_BASE = runtimeEnv || 'http://localhost:8080';
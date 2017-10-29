export const PRODUCTION = process.env.NODE_ENV === 'production'
export const API_URL = PRODUCTION ? '/api' : 'http://localhost:4000/api'

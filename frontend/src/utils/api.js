import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  healthCheck: () => api.get('/health'),
  
  // Generate risk assessment
  generateRiskAssessment: (businessProfile) => 
    api.post('/api/generate-risk-assessment', businessProfile),
  
  // Get config
  getConfig: () => api.get('/api/config'),
};

export default api;

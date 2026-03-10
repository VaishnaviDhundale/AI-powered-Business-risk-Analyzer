import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import BusinessProfileForm from './components/BusinessProfileForm';
import RiskPlanReport from './components/RiskPlanReport';
import { apiService } from './utils/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'report'
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiHealthy, setApiHealthy] = useState(true);

  useEffect(() => {
    // Check API health on mount
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await apiService.healthCheck();
      setApiHealthy(true);
    } catch (err) {
      console.warn('API health check failed:', err);
      setApiHealthy(false);
    }
  };

  const handleFormSubmit = async (businessProfile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.generateRiskAssessment(businessProfile);
      setAssessment(response.data);
      setCurrentView('report');
    } catch (err) {
      let errorMessage = 'Failed to generate assessment. ';
      
      if (err.response?.status === 503) {
        errorMessage += 'The backend service is not configured. Make sure to set HF_API_KEY environment variable.';
      } else if (err.response?.status === 422) {
        // Detailed Pydantic validation error logging
        console.error('Validation Data Error:', JSON.stringify(err.response?.data, null, 2));
        errorMessage += `Validation Error: ${JSON.stringify(err.response?.data?.detail)}`;
      } else if (err.message === 'Network Error') {
        errorMessage += 'Cannot connect to the backend. Make sure the server is running on http://localhost:8000';
      } else {
        errorMessage += err.response?.data?.detail || err.message || 'Please check your input and try again.';
      }

      setError(errorMessage);
      console.error('Assessment generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentView('form');
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>AI Business Risk & Mitigation Plan Generator</h1>
          <p>Research-grade risk assessment powered by Generative AI</p>
        </div>
      </header>

      <main className="app-main">
        {!apiHealthy && (
          <div className="warning-banner">
            <FiAlertCircle size={20} />
            <span>
              ⚠️ Backend connection issue. Make sure the FastAPI server is running at http://localhost:8000
            </span>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <FiAlertCircle size={20} />
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {currentView === 'form' ? (
          <BusinessProfileForm onSubmit={handleFormSubmit} loading={loading} />
        ) : (
          <RiskPlanReport assessment={assessment} onBack={handleBack} />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 AI Risk Assessment Platform. Built with React & FastAPI. For research and analysis purposes.</p>
      </footer>
    </div>
  );
}

export default App;

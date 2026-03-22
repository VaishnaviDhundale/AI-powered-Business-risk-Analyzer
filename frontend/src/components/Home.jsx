import React from 'react';
import { FiTrendingUp, FiShield, FiCpu } from 'react-icons/fi';

function Home({ setCurrentPage }) {
  return (
    <div className="page-container home-page">
      <div className="hero-section">
        <h1>Intelligent Business Risk Analysis</h1>
        <p>Leverage the power of AI to identify, quantify, and mitigate hidden threats to your business before they happen.</p>
        <button className="cta-button" onClick={() => setCurrentPage('analyzer')}>
          Start Free Analysis
        </button>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <FiCpu className="feature-icon" />
          </div>
          <h3>AI-Powered Insights</h3>
          <p>Our advanced models scan millions of data points to generate custom risk profiles specific to your industry constraints.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <FiShield className="feature-icon" />
          </div>
          <h3>Deterministic Weights</h3>
          <p>We blend AI intelligence with strict mathematical industry-weighted formulas to guarantee precision and eliminate hallucination.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <FiTrendingUp className="feature-icon" />
          </div>
          <h3>Actionable Mitigation</h3>
          <p>Don't just discover risks—solve them. Receive a tailored, step-by-step mitigation plan prioritized by critical impact.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

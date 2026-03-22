import React from 'react';
import { FiAlertTriangle, FiTrendingUp, FiCheck } from 'react-icons/fi';
import { getSeverityColor, getSeverityBgColor } from '../utils/helpers';
import '../styles/RiskCard.css';

const RiskCard = ({ risk, categoryName }) => {
  const severityColor = getSeverityColor(risk.severity);
  const severityBg = getSeverityBgColor(risk.severity);

  const getSeverityIcon = () => {
    if (risk.severity === 'Critical') return '🔴';
    if (risk.severity === 'High') return '🟠';
    if (risk.severity === 'Medium') return '🟡';
    return '🟢';
  };

  return (
    <div className="risk-card">
      <div className="risk-header">
        <div className="risk-title-section">
          <h4 className="risk-title">{risk.risk_title}</h4>
          <span 
            className="severity-badge" 
            style={{ backgroundColor: severityBg, color: severityColor, borderColor: severityColor }}
          >
            {getSeverityIcon()} {risk.severity}
          </span>
        </div>
        <div className="risk-score">
          <div className="score-value">{Math.round(risk.risk_score)}</div>
          <div className="score-label">Risk Score</div>
        </div>
      </div>

      <div className="risk-description">
        <p>{risk.risk_description}</p>
      </div>

      <div className="risk-metrics">
        <div className="metric">
          <span className="metric-label">Business Impact</span>
          <p className="metric-value">{risk.business_impact}</p>
        </div>
        <div className="metric">
          <span className="metric-label">Likelihood</span>
          <p className="metric-value">{risk.likelihood}</p>
        </div>
        <div className="metric">
          <span className="metric-label">Responsible Area</span>
          <p className="metric-value">{risk.responsible_area}</p>
        </div>
      </div>

      <div className="risk-strategy">
        <div className="strategy-item">
          <div className="strategy-header">
            <FiCheck size={18} />
            <span>Mitigation Strategy</span>
          </div>
          <p>{risk.mitigation_strategy}</p>
        </div>
        
        <div className="strategy-item">
          <div className="strategy-header">
            <FiTrendingUp size={18} />
            <span>Monitoring Method</span>
          </div>
          <p>{risk.monitoring_method}</p>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
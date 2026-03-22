import React, { useState } from 'react';
import { FiBarChart2, FiDownload, FiCopy, FiArrowLeft } from 'react-icons/fi';
import RiskCard from './RiskCard';
import RiskChart from './RiskChart';
import { formatDate, downloadAsJSON, downloadAsCSV } from '../utils/helpers';
import '../styles/RiskPlanReport.css';

import html2pdf from 'html2pdf.js';

const RiskPlanReport = ({ assessment, onBack }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const handleCopyReport = () => {
    const reportText = `
BUSINESS RISK & MITIGATION PLAN REPORT
=====================================
Business: ${assessment.business_name}
Date: ${formatDate(assessment.assessment_date)}

EXECUTIVE SUMMARY
${assessment.executive_summary}

OVERALL RISK SCORE: ${Math.round(assessment.overall_risk_score)}/100

KEY RECOMMENDATIONS:
${assessment.key_recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n')}

DETAILED RISK ANALYSIS:
${assessment.categories.map(cat => `
${cat.category_name.toUpperCase()} (Score: ${Math.round(cat.total_risk_score)}/100)
${cat.category_description}
${cat.risks.map(r => `- ${r.risk_title} [${r.severity}] (${Math.round(r.risk_score)}/100)`).join('\n')}
`).join('\n')}
    `;

    navigator.clipboard.writeText(reportText).then(() => {
      alert('Report copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy report. Please try the export options instead.');
    });
  };

  const handleDownloadJSON = () => {
    downloadAsJSON(assessment, `risk_assessment_${assessment.business_name.replace(/\s+/g, '_')}.json`);
  };

  const handleDownloadCSV = () => {
    downloadAsCSV(assessment, `risk_assessment_${assessment.business_name.replace(/\s+/g, '_')}.csv`);
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.report-container');
    const opt = {
      margin:       10,
      filename:     `risk_assessment_${assessment.business_name.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Temporarily hide elements we don't want in the PDF
    const elementsToHide = document.querySelectorAll('.back-btn, .export-buttons');
    elementsToHide.forEach(el => el.style.display = 'none');
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Show elements again
      elementsToHide.forEach(el => el.style.display = '');
    });
  };

  const categoryIcons = {
    'Strategic Risks': '📋',
    'Operational Risks': '⚙️',
    'Technology & AI Risks': '🤖',
    'Data & Privacy Risks': '🔐',
    'Security Risks': '🛡️',
    'Legal & Compliance Risks': '⚖️',
    'Market & Financial Risks': '💰',
    'Ethical & Reputational Risks': '🌟'
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <button className="back-btn" onClick={onBack}>
          <FiArrowLeft size={20} />
          Back to Form
        </button>

        <div className="header-content">
          <h1>Business Risk & Mitigation Plan</h1>
          <p className="business-name">{assessment.business_name}</p>
          <p className="assessment-date">{formatDate(assessment.assessment_date)}</p>
        </div>

        <div className="export-buttons">
          <button className="export-btn" onClick={handleCopyReport} title="Copy to Clipboard">
            <FiCopy size={18} />
            <span>Copy</span>
          </button>
          <button className="export-btn" onClick={handleDownloadPDF} title="Download PDF">
            <FiDownload size={18} />
            <span>PDF</span>
          </button>
          <button className="export-btn" onClick={handleDownloadJSON} title="Download JSON">
            <FiDownload size={18} />
            <span>JSON</span>
          </button>
          <button className="export-btn" onClick={handleDownloadCSV} title="Download CSV">
            <FiDownload size={18} />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="executive-summary">
        <h2>Executive Summary</h2>
        <p>{assessment.executive_summary}</p>
      </div>

      {/* Overall Risk Score & Key Recommendations */}
      <div className="summary-metrics">
        <div className="metric-card overall-score">
          <div className="metric-label">Overall Risk Score</div>
          <div className="metric-display">
            <svg viewBox="0 0 100 100" className="score-circle">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={assessment.overall_risk_score < 30 ? '#10b981' : assessment.overall_risk_score < 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${(assessment.overall_risk_score / 100) * 283} 283`}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
              <text x="50" y="55" textAnchor="middle" fontSize="24" fill="#1f2937" fontWeight="bold">
                {Math.round(assessment.overall_risk_score)}
              </text>
            </svg>
            <div className="score-interpretation">
              {assessment.overall_risk_score < 30 && <span className="low">Low Risk</span>}
              {assessment.overall_risk_score >= 30 && assessment.overall_risk_score < 60 && <span className="medium">Medium Risk</span>}
              {assessment.overall_risk_score >= 60 && <span className="high">High Risk</span>}
            </div>
          </div>
        </div>

        <div className="metric-card key-recommendations">
          <div className="metric-label">Key Recommendations</div>
          <ol className="recommendations-list">
            {assessment.key_recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Risk Distribution Chart */}
      <div className="chart-section">
        <h2>Risk Distribution by Category</h2>
        <RiskChart categories={assessment.categories} />
      </div>

      {/* Risk Categories */}
      <div className="categories-section">
        <h2>Detailed Risk Analysis</h2>
        
        {assessment.categories.map((category, idx) => (
          <div key={idx} className={`category-section ${expandedCategory === idx ? 'expanded' : ''}`}>
            <div 
              className="category-header"
              onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
            >
              <div className="category-title">
                <span className="category-icon">{categoryIcons[category.category_name] || '📌'}</span>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {category.category_name}
                    <span style={{ fontSize: '0.8em', color: '#94a3b8' }}>{expandedCategory === idx ? '▲' : '▼'}</span>
                  </h3>
                  <p className="category-description">{category.category_description}</p>
                </div>
              </div>
              <div className="category-score">
                <div className="score-value">{Math.round(category.total_risk_score)}</div>
              </div>
            </div>

            {expandedCategory === idx && (
              <div className="risks-grid" style={{ marginTop: '20px', animation: 'slideIn 0.3s ease' }}>
                {category.risks.map((risk, riskIdx) => (
                  <RiskCard key={riskIdx} risk={risk} categoryName={category.category_name} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="report-footer">
        <p>This report was generated using AI Business Risk Assessment technology.</p>
        <p className="footer-timestamp">Generated on {formatDate(assessment.assessment_date)}</p>
      </div>
    </div>
  );
};

export default RiskPlanReport;
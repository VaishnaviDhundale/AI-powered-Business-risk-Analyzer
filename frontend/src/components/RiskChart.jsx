import React from 'react';
import '../styles/RiskChart.css';

const RiskChart = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p>No data available for chart</p>;
  }

  // Sort categories by risk score (highest first) for better visualization
  const sortedCategories = [...categories].sort((a, b) => b.total_risk_score - a.total_risk_score);
  
  const maxScore = 100;
  const chartHeight = 300;
  const barHeight = chartHeight / categories.length;

  return (
    <div className="chart-container">
      <div className="bar-chart">
        <div className="y-axis">
          <div className="axis-label">Risk Score</div>
          <div className="axis-tick">100</div>
          <div className="axis-tick">75</div>
          <div className="axis-tick">50</div>
          <div className="axis-tick">25</div>
          <div className="axis-tick">0</div>
        </div>

        <div className="bars-container">
          {sortedCategories.map((category, idx) => {
            const percentage = (category.total_risk_score / maxScore) * 100;
            const barColor = category.total_risk_score < 30 ? '#10b981' : 
                            category.total_risk_score < 60 ? '#f59e0b' : '#ef4444';

            return (
              <div key={idx} className="bar-row">
                <div className="bar-label">{category.category_name.substring(0, 15)}</div>
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }}
                  >
                    <span className="bar-value">{Math.round(category.total_risk_score)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Low Risk (0-30)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Medium Risk (30-60)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>High Risk (60-100)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;

import React from 'react';

function About() {
  return (
    <div className="page-container about-page">
      <div className="page-header">
        <h2>About RiskIQ</h2>
        <p>Redefining corporate risk management through artificial intelligence.</p>
      </div>
      <div className="content-card">
        <h3>Our Methodology</h3>
        <p>
          At RiskIQ, we believe that identifying risk shouldn't be a manual, months-long consulting engagement. 
          By unifying Large Language Models with our proprietary deterministic weighting engine, we deliver enterprise-grade 
          risk assessment across 8 comprehensive categories: Strategic, Operational, Technology, Data Privacy, Security, Legal, Market, and Ethical.
        </p>
        <br />
        <h3>Mathematical Precision</h3>
        <p>
          We know that an Ethical Risk means something entirely different to a Healthcare provider vs. a Manufacturing plant. 
          That's why our backend architecture applies strict algorithmic caps and weights tailored directly to your chosen industry, 
          guaranteeing that your overall Risk Score is mathematically unshakeable.
        </p>
      </div>
    </div>
  );
}

export default About;

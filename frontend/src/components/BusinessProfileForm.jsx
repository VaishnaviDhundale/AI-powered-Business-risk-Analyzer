import React, { useState } from 'react';
import { FiTarget, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';
import '../styles/BusinessProfileForm.css';

const BusinessProfileForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    business_name: '',
    industry: 'FinTech',
    business_model: 'Startup',
    target_market: 'B2B',
    product_description: '',
    technology_stack: [],
    data_sensitivity: 'Moderate',
    deployment_region: 'Global',
    regulatory_environment: [],
    ai_usage_level: 'Assistive AI'
  });

  const [technologies, setTechnologies] = useState('');
  const [regulations, setRegulations] = useState('');

  const industries = ['FinTech', 'Healthcare', 'E-commerce', 'SaaS', 'Education', 'Manufacturing', 'Other'];
  const businessModels = ['Startup', 'SME', 'Enterprise'];
  const targetMarkets = ['B2B', 'B2C', 'Government', 'Hybrid'];
  const dataSensitivity = ['Low', 'Moderate', 'High'];
  const regions = ['India', 'US', 'Global', 'Other'];
  const aiUsages = ['None', 'Assistive AI', 'Core AI Product'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechChange = (e) => {
    setTechnologies(e.target.value);
  };

  const handleRegChange = (e) => {
    setRegulations(e.target.value);
  };

  const addTechnology = (e) => {
    if (e.key === 'Enter' && technologies.trim()) {
      setFormData(prev => ({
        ...prev,
        technology_stack: [...new Set([...prev.technology_stack, technologies.trim()])]
      }));
      setTechnologies('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technology_stack: prev.technology_stack.filter(t => t !== tech)
    }));
  };

  const addRegulation = (e) => {
    if (e.key === 'Enter' && regulations.trim()) {
      setFormData(prev => ({
        ...prev,
        regulatory_environment: [...new Set([...prev.regulatory_environment, regulations.trim()])]
      }));
      setRegulations('');
    }
  };

  const removeRegulation = (reg) => {
    setFormData(prev => ({
      ...prev,
      regulatory_environment: prev.regulatory_environment.filter(r => r !== reg)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.business_name.trim()) {
      alert('Business name is required');
      return;
    }
    
    if (!formData.product_description.trim()) {
      alert('Product description is required');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="header-icon">
          <FiTarget size={32} />
        </div>
        <div className="header-content">
          <h1>Business Risk Assessment Form</h1>
          <p>Provide your business details for AI-powered risk analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="business-form">
        {/* Section 1: Business Basics */}
        <fieldset className="form-section">
          <legend>Business Information</legend>
          
          <div className="form-group">
            <label htmlFor="business_name">Business Name *</label>
            <input
              id="business_name"
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              placeholder="e.g., TechFinance Solutions"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="industry">Industry *</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="business_model">Business Model *</label>
              <select
                id="business_model"
                name="business_model"
                value={formData.business_model}
                onChange={handleInputChange}
              >
                {businessModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Section 2: Market & Product */}
        <fieldset className="form-section">
          <legend>Market & Product</legend>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="target_market">Target Market *</label>
              <select
                id="target_market"
                name="target_market"
                value={formData.target_market}
                onChange={handleInputChange}
              >
                {targetMarkets.map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="deployment_region">Deployment Region</label>
              <select
                id="deployment_region"
                name="deployment_region"
                value={formData.deployment_region}
                onChange={handleInputChange}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product_description">Product / Service Description *</label>
            <textarea
              id="product_description"
              name="product_description"
              value={formData.product_description}
              onChange={handleInputChange}
              placeholder="Describe your product, its key features, and value proposition..."
              rows="4"
              required
            />
          </div>
        </fieldset>

        {/* Section 3: Technology & Data */}
        <fieldset className="form-section">
          <legend>Technology & Data</legend>
          
          <div className="form-group">
            <label htmlFor="technology_input">Technology Stack</label>
            <div className="input-with-button">
              <input
                id="technology_input"
                type="text"
                value={technologies}
                onChange={handleTechChange}
                onKeyPress={addTechnology}
                placeholder="e.g., AI, Cloud, Web (press Enter to add)"
              />
            </div>
            <div className="tags-container">
              {formData.technology_stack.map(tech => (
                <span key={tech} className="tag">
                  {tech}
                  <button type="button" onClick={() => removeTechnology(tech)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="data_sensitivity">Data Sensitivity Level</label>
              <select
                id="data_sensitivity"
                name="data_sensitivity"
                value={formData.data_sensitivity}
                onChange={handleInputChange}
              >
                {dataSensitivity.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ai_usage_level">AI Usage Level</label>
              <select
                id="ai_usage_level"
                name="ai_usage_level"
                value={formData.ai_usage_level}
                onChange={handleInputChange}
              >
                {aiUsages.map(usage => (
                  <option key={usage} value={usage}>{usage}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Section 4: Compliance */}
        <fieldset className="form-section">
          <legend>Regulatory & Compliance</legend>
          
          <div className="form-group">
            <label htmlFor="regulatory_input">Regulatory Environment</label>
            <div className="input-with-button">
              <input
                id="regulatory_input"
                type="text"
                value={regulations}
                onChange={handleRegChange}
                onKeyPress={addRegulation}
                placeholder="e.g., GDPR, HIPAA, PCI-DSS (press Enter to add)"
              />
            </div>
            <div className="tags-container">
              {formData.regulatory_environment.map(reg => (
                <span key={reg} className="tag regulatory">
                  {reg}
                  <button type="button" onClick={() => removeRegulation(reg)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating Assessment...
              </>
            ) : (
              <>
                <FiTrendingUp style={{ marginRight: '8px' }} />
                Generate AI Risk Plan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;

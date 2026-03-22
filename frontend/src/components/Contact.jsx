import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container contact-page">
      <div className="page-header">
        <h2>Contact Our Experts</h2>
        <p>Need custom API access or enterprise volume limits? Get in touch.</p>
      </div>
      <div className="content-card">
        {submitted ? (
          <div className="success-message" style={{ textAlign: 'center', padding: '40px 0' }}>
            <h3 style={{ color: 'var(--success-color)', marginBottom: '10px' }}>Message Sent!</h3>
            <p>Our team will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, color: 'var(--primary-dark)' }}>Name</label>
              <input type="text" required placeholder="Jane Doe" style={{ padding: '12px', borderRadius: '6px', border: '1px solid var(--border-gray)', fontSize: '1rem' }} />
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, color: 'var(--primary-dark)' }}>Corporate Email</label>
              <input type="email" required placeholder="jane@company.com" style={{ padding: '12px', borderRadius: '6px', border: '1px solid var(--border-gray)', fontSize: '1rem' }} />
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, color: 'var(--primary-dark)' }}>How can we help?</label>
              <textarea rows="5" required placeholder="Tell us about your use case..." style={{ padding: '12px', borderRadius: '6px', border: '1px solid var(--border-gray)', fontSize: '1rem', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="cta-button" style={{ marginTop: '10px', width: '100%' }}>Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;

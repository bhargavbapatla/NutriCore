import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ padding: '80px 5%', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 className="section-title">Privacy Protocol</h1>
      <div style={{ lineHeight: '1.8', color: '#b0b8c6' }}>
        <p>Your biometric data and health metrics are secured using state-of-the-art encryption standards. We do not transmit unencrypted biological identifiers.</p>
        <p>By using NutriCore, you agree to our comprehensive data collection policy intended solely for optimizing your biological performance.</p>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <Link to="/" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Return Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

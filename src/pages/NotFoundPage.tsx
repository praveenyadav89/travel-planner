import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '80px', margin: 0 }}>404</h1>
      <h2 style={{ color: 'var(--text-secondary)' }}>Page not found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        The page you're looking for doesn't exist.
      </p>
      <button className="cta-btn" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;

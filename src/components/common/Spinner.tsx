import React from 'react';

interface Props { size?: number; text?: string; fullPage?: boolean; }

const Spinner: React.FC<Props> = ({ size = 36, text, fullPage = false }) => {
  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: size, height: size,
        border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: '#38bdf8',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      {text && <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      }}>
        {spinner}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
      {spinner}
    </div>
  );
};

export default Spinner;

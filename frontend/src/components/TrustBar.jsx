import React from 'react';

export default function TrustBar({
  items = [],
  background = 'linear-gradient(to right, #0f0f0f, #000)',
}) {
  return (
    <div style={{ ...wrapper, background }}>
      {items.map((text, i) => (
        <div key={i} style={item}>
          <span style={check}>✓</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const wrapper = {
  // width: '100%',
  background: '#1a1a1a',
  borderTop: '1px solid rgba(255,255,255,0.05)',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  padding: '14px 24px',
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  flexWrap: 'wrap',
};

const item = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap',
};

const check = {
  color: '#4ade80', // warm orange like your screenshot
  fontSize: '14px',
};

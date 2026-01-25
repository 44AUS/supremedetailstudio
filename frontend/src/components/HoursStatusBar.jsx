import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function HoursStatusBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation] = useState('Marietta, GA');
  const location = useLocation();

  // Pages where this bar should NOT appear
const minimalNavRoutes = ['/get-quote', '/book-appointment'];

const isMinimalNav = minimalNavRoutes.some(route =>
  location.pathname.startsWith(route)
);


  // Business hours configuration
  const businessHours = {
    monday: { open: '9:00', close: '18:00' },
    tuesday: { open: '9:00', close: '18:00' },
    wednesday: { open: '9:00', close: '18:00' },
    thursday: { open: '9:00', close: '18:00' },
    friday: { open: '9:00', close: '18:00' },
    saturday: { open: '10:00', close: '16:00' },
    sunday: { open: null, close: null }
  };

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDay = days[now.getDay()];
      const hours = businessHours[currentDay];

      if (!hours?.open || !hours?.close) {
        setIsOpen(false);
        return;
      }

      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [openHour, openMin] = hours.open.split(':').map(Number);
      const [closeHour, closeMin] = hours.close.split(':').map(Number);

      const openTime = openHour * 60 + openMin;
      const closeTime = closeHour * 60 + closeMin;

      setIsOpen(currentTime >= openTime && currentTime < closeTime);
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isMinimalNav) return null;

  return (
    <div
      style={{
        background: '#e80200',
        color: '#fff',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        fontSize: '13px',
        fontFamily: "'Oswald', sans-serif",
        letterSpacing: '1px',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isOpen ? '#4ade80' : '#1f2933',
            animation: isOpen ? 'pulse 2s infinite' : 'none',
          }}
        />
        <span style={{ fontWeight: 600 }}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>

      <span style={{ opacity: 0.6 }}>|</span>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{currentLocation}</span>
      </div>

      <span style={{ opacity: 0.6 }}>|</span>

      {/* CTA */}
      <Link
        to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Book Appointment
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
}

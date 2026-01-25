import React from 'react';
import { Link } from 'react-router-dom';

export default function GetQuote() {
  const services = [
    {
      title: 'Automotive',
      icon: '🚗',
      subtitle: 'Instant Quote',
      path: '/quote/automotive',
      highlight: true,
    },
    {
      title: 'Residential',
      icon: '🏠',
      subtitle: 'Quote in 24 hrs',
      path: '/quote/residential',
    },
    {
      title: 'Commercial',
      icon: '🏢',
      subtitle: 'Quote in 24 hrs',
      path: '/quote/commercial',
    },
    {
      title: 'Security Film',
      icon: '🛡️',
      subtitle: 'Quote in 24 hrs',
      path: '/quote/security',
    },
  ];

  return (
    <section
      style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '48px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '10px',
          }}
        >
          Get a <span style={{ color: '#e80200' }}>Free Quote</span>
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: '50px',
          }}
        >
          Select a service to get started.
        </p>

        {/* Card Container */}
        <div
          style={{
            background: 'rgba(15, 15, 15, 0.9)',
            borderRadius: '18px',
            padding: '40px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          }}
        >
          <h3
            style={{
              textAlign: 'left',
              fontFamily: "'Oswald', sans-serif",
              color: '#e80200',
              letterSpacing: '1px',
              fontSize: '16px',
              marginBottom: '25px',
            }}
          >
            1&nbsp;&nbsp;What type of service do you need?
          </h3>

          {/* Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
            }}
          >
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(0,0,0,0.6)',
                  borderRadius: '14px',
                  padding: '28px 20px',
                  border: service.highlight
                    ? '1px solid rgba(0, 255, 0, 0.4)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                  boxShadow: service.highlight
                    ? '0 0 0 rgba(0,0,0,0)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow =
                    '0 20px 40px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                  {service.icon}
                </div>

                <div
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: '#fff',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {service.title}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: "'Montserrat', sans-serif",
                    color: service.highlight ? '#00ff7f' : 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {service.subtitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

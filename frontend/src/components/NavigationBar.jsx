import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const services = [
    { name: 'Auto Detailing', path: '/services/detailing' },
    { name: 'Mobile Detailing', path: '/services/mobile-detailing' },
    { name: 'Ceramic Coating', path: '/services/ceramic-coatings' },
    { name: 'Paint Correction', path: '/services/paint-correction' },
    { name: 'Paint Protection Film', path: '/services/paint-protection-film' },
    { name: 'Light Protection Film', path: '/services/light-protection-film' },
    { name: 'Window Tinting', path: '/services/window-tinting' },
    { name: 'Windshield Protection', path: '/services/windshield-protection-film' },
    { name: 'Headlight Restoration', path: '/services/headlight-restoration' },
    { name: 'Additional Services', path: '/services/additional-services' },
  ];

  const moreLinks = [
    { name: 'Before & After', path: '/before-and-after' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQs', path: '/faq' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img 
            src={Logo} 
            alt='Supreme Detail Studio'
            style={{ 
              height: '50px',
              width: 'auto',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }} className="desktop-nav">
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{
                transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            
            {/* Services Dropdown Menu */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: 'rgba(15, 15, 15, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px 0',
              minWidth: '260px',
              opacity: servicesOpen ? 1 : 0,
              visibility: servicesOpen ? 'visible' : 'hidden',
              transform: servicesOpen ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.path}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'SceneProMedium, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(232, 2, 0, 0.2)';
                    e.currentTarget.style.paddingLeft = '28px';
                    e.currentTarget.style.color = '#e80200';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '20px';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <NavLink 
            to='/about'
            style={{
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            About
          </NavLink>

          {/* Reviews */}
          <NavLink 
            to='/reviews'
            style={{
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            Reviews
          </NavLink>

          {/* Blog */}
          <NavLink 
            to='/blog'
            style={{
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            Blog
          </NavLink>

          {/* More Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
            >
              More
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{
                transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            
            {/* More Dropdown Menu */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: 'rgba(15, 15, 15, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px 0',
              minWidth: '200px',
              opacity: moreOpen ? 1 : 0,
              visibility: moreOpen ? 'visible' : 'hidden',
              transform: moreOpen ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}>
              {moreLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'SceneProMedium, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(232, 2, 0, 0.2)';
                    e.currentTarget.style.paddingLeft = '28px';
                    e.currentTarget.style.color = '#e80200';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '20px';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <NavLink 
            to='/contact-us'
            style={{
              color: '#fff',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '12px 16px',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            Contact
          </NavLink>
        </div>

        {/* Book Appointment Button - Desktop */}
        <Link 
          to='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw' 
          target="_blank"
          className="desktop-nav"
          style={{
            backgroundColor: '#e80200',
            color: '#fff',
            fontFamily: 'SceneProBold, sans-serif',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '14px 28px',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(232, 2, 0, 0.3)',
            flexShrink: 0,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ff1a1a';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(232, 2, 0, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#e80200';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(232, 2, 0, 0.3)';
          }}
        >
          Book Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#fff',
            marginBottom: '6px',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none',
          }}></div>
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#fff',
            marginBottom: '6px',
            opacity: isMenuOpen ? 0 : 1,
            transition: 'all 0.3s ease',
          }}></div>
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#fff',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
          }}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className="mobile-menu"
        style={{
          display: 'none',
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.98)',
          padding: '24px',
          overflowY: 'auto',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: 'block',
              padding: '16px 0',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'SceneProBold, sans-serif',
              fontSize: '16px',
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {service.name}
          </Link>
        ))}
        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: 'block',
            padding: '16px 0',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'SceneProBold, sans-serif',
            fontSize: '16px',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          About
        </Link>
        <Link
          to="/reviews"
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: 'block',
            padding: '16px 0',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'SceneProBold, sans-serif',
            fontSize: '16px',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          Reviews
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: 'block',
            padding: '16px 0',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'SceneProBold, sans-serif',
            fontSize: '16px',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          Contact
        </Link>
        <Link
          to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw"
          target="_blank"
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: 'block',
            marginTop: '24px',
            padding: '16px 24px',
            backgroundColor: '#e80200',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'SceneProBold, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            borderRadius: '4px',
          }}
        >
          Book Appointment
        </Link>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

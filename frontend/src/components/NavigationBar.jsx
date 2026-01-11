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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
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
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
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
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
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
                borderRadius: '8px',
                padding: '8px 0',
                minWidth: '240px',
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
                      padding: '10px 20px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontFamily: 'SceneProRg, sans-serif',
                      fontSize: '13px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
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
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                textDecoration: 'none',
              }}
            >
              About
            </NavLink>

            {/* Reviews */}
            <NavLink 
              to='/reviews'
              style={{
                color: '#fff',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                textDecoration: 'none',
              }}
            >
              Reviews
            </NavLink>

            {/* Blog */}
            <NavLink 
              to='/blog'
              style={{
                color: '#fff',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                textDecoration: 'none',
              }}
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
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
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
                borderRadius: '8px',
                padding: '8px 0',
                minWidth: '180px',
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
                      padding: '10px 20px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontFamily: 'SceneProRg, sans-serif',
                      fontSize: '13px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
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
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '12px 16px',
                textDecoration: 'none',
              }}
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
              fontFamily: 'SceneProRg, sans-serif',
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '12px 24px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Book Appointment
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              gap: '5px',
            }}
          >
            <span style={{
              width: '25px',
              height: '2px',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}></span>
            <span style={{
              width: '25px',
              height: '2px',
              backgroundColor: '#fff',
              opacity: isMenuOpen ? 0 : 1,
              transition: 'all 0.3s ease',
            }}></span>
            <span style={{
              width: '25px',
              height: '2px',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.98)',
            zIndex: 999,
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {/* Services Section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                color: '#e80200',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingLeft: '5px',
              }}>
                Services
              </div>
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.path}
                  onClick={closeMenu}
                  style={{
                    display: 'block',
                    padding: '12px 5px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'SceneProRg, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            {/* Other Links */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                color: '#e80200',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingLeft: '5px',
              }}>
                Pages
              </div>
              <Link to="/about" onClick={closeMenu} style={{
                display: 'block',
                padding: '12px 5px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                About
              </Link>
              <Link to="/reviews" onClick={closeMenu} style={{
                display: 'block',
                padding: '12px 5px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                Reviews
              </Link>
              <Link to="/gallery" onClick={closeMenu} style={{
                display: 'block',
                padding: '12px 5px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                Gallery
              </Link>
              <Link to="/contact-us" onClick={closeMenu} style={{
                display: 'block',
                padding: '12px 5px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                Contact Us
              </Link>
            </div>

            {/* Book Button */}
            <Link
              to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw"
              target="_blank"
              onClick={closeMenu}
              style={{
                display: 'block',
                marginTop: '30px',
                padding: '16px 24px',
                backgroundColor: '#e80200',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Book Appointment
            </Link>

            {/* Phone */}
            <Link
              to="tel:5024170690"
              onClick={closeMenu}
              style={{
                display: 'block',
                marginTop: '15px',
                padding: '16px 24px',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'SceneProRg, sans-serif',
                fontSize: '14px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Call (502) 417-0690
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

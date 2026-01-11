import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import {Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import {ChevronDown} from "./Icons.jsx";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinkStyle = {
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontFamily: 'SceneProBold',
    letterSpacing: '2px',
    fontSize: '13px',
    color: '#fff',
    transition: 'all 0.3s ease',
    padding: '8px 12px',
    borderRadius: '4px',
  };

  const dropdownLinkStyle = {
    padding: '10px 16px',
    fontFamily: 'SceneProBold',
    textTransform: 'uppercase',
    color: '#FFF',
    letterSpacing: '2px',
    fontSize: '13px',
    display: 'block',
    transition: 'all 0.3s ease',
  };

  const mobileMenuItems = [
    { name: 'Auto Detailing', path: '/services/detailing' },
    { name: 'Mobile Detailing', path: '/services/mobile-detailing' },
    { name: 'Paint Protection Film', path: '/services/paint-protection-film' },
    { name: 'Ceramic Coating', path: '/services/ceramic-coatings' },
    { name: 'Window Tinting', path: '/services/window-tinting' },
    { name: 'Light Protection Film', path: '/services/light-protection-film' },
    { name: 'Windshield Protection Film', path: '/services/windshield-protection-film' },
    { name: 'Paint Correction', path: '/services/paint-correction' },
    { name: 'Headlight Restoration', path: '/services/headlight-restoration' },
    { name: 'Additional Services', path: '/services/additional-services' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <div style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <Navbar 
          height='85px' 
          classNames={{ 
            wrapper: "!max-w-full !px-0",
            base: "!bg-transparent"
          }} 
          isBordered={false}
          isMenuOpen={isMenuOpen} 
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />

          <NavbarBrand>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img 
                className="logo" 
                src="images/logo.png" 
                alt='Supreme Detail Studio Logo'
                style={{ 
                  maxWidth: '180px', 
                  height: 'auto',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </Link>
          </NavbarBrand>

          {/* Mobile Menu */}
          <NavbarMenu style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.98)', 
            paddingTop: '20px',
            overflowY: 'auto'
          }}>
            {mobileMenuItems.map((item, index) => (
              <NavbarMenuItem key={index} style={{ padding: '8px 0' }}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: '#fff',
                    fontFamily: 'SceneProBold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(232, 2, 0, 0.2)';
                    e.currentTarget.style.paddingLeft = '24px';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '16px';
                  }}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>

          {/* Desktop Navigation */}
          <NavbarContent className="hidden sm:flex gap-6" justify="center">
            <Dropdown 
              showArrow
              classNames={{
                base: "before:bg-default-200",
                content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-gray-900 to-black",
              }}
              backdrop="blur"
            >
              <NavbarItem>
                <DropdownTrigger>
                  <div 
                    style={navLinkStyle}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    Services
                  </div>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                variant="faded"
                aria-label="Supreme Detail Studio Services"
                className="w-[260px]"
                itemClasses={{ base: "gap-2" }}
              >
                <DropdownItem key="detailing">
                  <Link to='/services/detailing' style={dropdownLinkStyle}>
                    Auto Detailing
                  </Link>
                </DropdownItem>
                <DropdownItem key="mobile">
                  <Link to='/services/mobile-detailing' style={dropdownLinkStyle}>
                    Mobile Detailing
                  </Link>
                </DropdownItem>
                <DropdownItem key="ceramic">
                  <Link to='/services/ceramic-coatings' style={dropdownLinkStyle}>
                    Ceramic Coating
                  </Link>
                </DropdownItem>
                <DropdownItem key="paint-correction">
                  <Link to='/services/paint-correction' style={dropdownLinkStyle}>
                    Paint Correction
                  </Link>
                </DropdownItem>
                <DropdownItem key="ppf">
                  <Link to='/services/paint-protection-film' style={dropdownLinkStyle}>
                    Paint Protection Film
                  </Link>
                </DropdownItem>
                <DropdownItem key="light-ppf">
                  <Link to='/services/light-protection-film' style={dropdownLinkStyle}>
                    Light Protection Film
                  </Link>
                </DropdownItem>
                <DropdownItem key="tinting">
                  <Link to='/services/window-tinting' style={dropdownLinkStyle}>
                    Window Tinting
                  </Link>
                </DropdownItem>
                <DropdownItem key="windshield">
                  <Link to='/services/windshield-protection-film' style={dropdownLinkStyle}>
                    Windshield Protection
                  </Link>
                </DropdownItem>
                <DropdownItem key="headlight">
                  <Link to='/services/headlight-restoration' style={dropdownLinkStyle}>
                    Headlight Restoration
                  </Link>
                </DropdownItem>
                <DropdownItem key="additional">
                  <Link to='/services/additional-services' style={dropdownLinkStyle}>
                    Additional Services
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavbarItem>
              <NavLink 
                to='/about' 
                style={navLinkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                About
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink 
                to='/reviews' 
                style={navLinkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                Reviews
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink 
                to='/blog' 
                style={navLinkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                Blog
              </NavLink>
            </NavbarItem>

            <Dropdown
              showArrow
              classNames={{
                base: "before:bg-default-200",
                content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-gray-900 to-black",
              }}
              backdrop="blur"
            >
              <NavbarItem>
                <DropdownTrigger>
                  <div 
                    style={navLinkStyle}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    More
                  </div>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                variant="faded"
                aria-label="More Links"
                className="w-[220px]"
                itemClasses={{ base: "gap-2" }}
              >
                <DropdownItem key="before-after">
                  <Link to='/before-and-after' style={dropdownLinkStyle}>
                    Before & After
                  </Link>
                </DropdownItem>
                <DropdownItem key="gallery">
                  <Link to='/gallery' style={dropdownLinkStyle}>
                    Gallery
                  </Link>
                </DropdownItem>
                <DropdownItem key="faq">
                  <Link to='/faq' style={dropdownLinkStyle}>
                    FAQs
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavbarItem>
              <NavLink 
                to='/contact-us' 
                style={navLinkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = '#e80200'}
                onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
              >
                Contact
              </NavLink>
            </NavbarItem>
          </NavbarContent>

          {/* Mobile Book Button */}
          <NavbarContent justify="end" className="sm:hidden">
            <NavbarItem>
              <Link to='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw' target="_blank">
                <Button 
                  radius="none" 
                  size="sm" 
                  style={{ 
                    backgroundColor: '#e80200',
                    fontFamily: 'SceneProRg',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>

          {/* Desktop Book Button */}
          <NavbarContent justify="end" className="max-sm:hidden">
            <NavbarItem>
              <Link to='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw' target="_blank">
                <Button 
                  radius="none" 
                  size="md" 
                  style={{ 
                    backgroundColor: '#e80200',
                    fontFamily: 'SceneProRg',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '0 32px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff1a1a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(232, 2, 0, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e80200';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Book Appointment
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
}

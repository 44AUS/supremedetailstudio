import React from 'react'
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import OnyxLogo from '../../assets/images/partners/onyx-logo@2x.webp';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    [theme.fn.smallerThan('md')]: {
      minHeight: '100vh',
    },
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(139, 0, 0, 0.45) 0%, rgba(80, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0.95) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '120px 20px 60px',
    [theme.fn.smallerThan('md')]: {
      padding: '100px 16px 40px',
    },
  },
  topBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
    backdropFilter: 'blur(10px)',
    padding: '12px 28px',
    borderRadius: '50px',
    marginBottom: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
      gap: '8px',
      padding: '12px 20px',
      marginBottom: '30px',
    },
  },
  badgeHighlight: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    color: '#e80200',
    letterSpacing: '0.5px',
  },
  badgeDivider: {
    width: '1px',
    height: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  badgeText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: '0.5px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '72px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textAlign: 'center',
    lineHeight: 1.05,
    textTransform: 'uppercase',
    fontWeight: 700,
    maxWidth: '900px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '38px',
      marginBottom: '20px',
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: '32px',
    },
  },
  titleAccent: {
    color: '#e80200',
    fontStyle: 'italic',
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '17px',
    textAlign: 'center',
    lineHeight: 1.7,
    maxWidth: '650px',
    fontWeight: 400,
    marginBottom: '36px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '15px',
      marginBottom: '28px',
    },
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '18px 48px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 24px rgba(232, 2, 0, 0.5)',
    marginBottom: '60px',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 32px rgba(232, 2, 0, 0.7)',
    },
    [theme.fn.smallerThan('md')]: {
      padding: '16px 36px',
      fontSize: '14px',
      marginBottom: '40px',
    },
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '48px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    [theme.fn.smallerThan('md')]: {
      gap: '24px',
    },
    [theme.fn.smallerThan('sm')]: {
      gap: '16px',
    },
  },
  statItem: {
    textAlign: 'center',
    minWidth: '120px',
    [theme.fn.smallerThan('sm')]: {
      minWidth: '70px',
    },
  },
  statNumber: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '42px',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '32px',
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: '26px',
    },
  },
  statStar: {
    color: '#e80200',
    fill: '#e80200',
  },
  statLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginTop: '8px',
    [theme.fn.smallerThan('sm')]: {
      fontSize: '9px',
      letterSpacing: '1px',
    },
  },
  certificationBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    padding: '14px 28px',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    [theme.fn.smallerThan('md')]: {
      padding: '12px 20px',
      gap: '10px',
    },
  },
  certificationCheck: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#e80200',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  certificationText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff',
    [theme.fn.smallerThan('md')]: {
      fontSize: '12px',
    },
  },
  certificationHighlight: {
    color: '#e80200',
    fontWeight: 700,
  },
}));

const Hero = () => {
  const { classes } = useStyles();

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '1,000+', label: 'Vehicles Serviced' },
    { number: '64+', label: '5-Star Reviews' },
    { number: '5.0', label: 'Satisfaction', hasStar: true },
  ];

  return (
    <div className={classes.wrapper} data-testid="hero-section">
      {/* Video Background */}
      <video
        className={classes.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/3126460/3126460-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Red Tinted Overlay with Bottom Fade */}
      <div className={classes.overlay} />

      {/* Content */}
      <div className={classes.content}>
        {/* Top Badge Bar */}
        <div className={classes.topBadge} data-testid="hero-top-badge">
          <span className={classes.badgeHighlight}>Vehicle Protection Specialists</span>
          <div className={classes.badgeDivider} />
          <span className={classes.badgeText}>Factory Certified</span>
          <div className={classes.badgeDivider} />
          <span className={classes.badgeText}>Marietta, GA</span>
        </div>

        {/* Main Title */}
        <Title className={classes.title} data-testid="hero-title">
          Marietta's <span className={classes.titleAccent}>Premier</span><br />
          Auto Detailing
        </Title>

        {/* Description */}
        <Text className={classes.description} data-testid="hero-description">
          Professional auto detailing, ceramic coatings, paint protection film,
          and window tinting. Premium services with exceptional results.
        </Text>

        {/* CTA Button */}
        <Link
          to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
          target="_blank"
          className={classes.primaryButton}
          data-testid="hero-cta-button"
        >
          Get Your Free Quote
        </Link>

        {/* Stats Row */}
        <div className={classes.statsContainer} data-testid="hero-stats">
          {stats.map((stat, index) => (
            <div key={index} className={classes.statItem}>
              <div className={classes.statNumber}>
                {stat.number}
                {stat.hasStar && <Star size={24} className={classes.statStar} />}
              </div>
              <div className={classes.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certification Badge */}
        <div className={classes.certificationBadge} data-testid="hero-certification">
          <div className={classes.certificationCheck}>
            <Check size={14} color="#fff" strokeWidth={3} />
          </div>
          <span className={classes.certificationText}>
            Proud <span className={classes.certificationHighlight}>Onyx Coating</span> Certified Dealer
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero;

import React from 'react';
import { Container, Title, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px',
  },
  backgroundText: {
    position: 'absolute',
    fontSize: '35vw',
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 700,
    color: 'rgba(232, 2, 0, 0.05)',
    userSelect: 'none',
    pointerEvents: 'none',
    lineHeight: 1,
    zIndex: 0,
    [theme.fn.smallerThan('md')]: {
      fontSize: '50vw',
    },
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
  },
  errorCode: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '140px',
    fontWeight: 700,
    color: '#e80200',
    lineHeight: 1,
    marginBottom: '0',
    textShadow: '0 0 40px rgba(232, 2, 0, 0.3)',
    animation: 'pulse 2s ease-in-out infinite',
    [theme.fn.smallerThan('md')]: {
      fontSize: '100px',
    },
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: 600,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginTop: '10px',
    marginBottom: '20px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '24px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.8,
    marginBottom: '40px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '18px 40px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(232, 2, 0, 0.6)',
    },
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '16px 38px',
    textDecoration: 'none',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.6)',
      transform: 'translateY(-3px)',
    },
  },
  links: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  linksTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  quickLinks: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  quickLink: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#e80200',
    },
  },
  carIcon: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
    opacity: 0.8,
  },
}));

const NotFoundPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Page Not Found | Supreme Detail Studio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Supreme Detail Studio for premium auto detailing, ceramic coating, and PPF services in Marietta, GA." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={classes.wrapper}>
        <span className={classes.backgroundText}>404</span>
        
        <div className={classes.content}>
          {/* Car silhouette SVG */}
          <svg className={classes.carIcon} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M95 35H90V30C90 28 88 25 85 25H75L65 15C63 13 60 12 57 12H35C32 12 29 13 27 15L17 25H15C12 25 10 28 10 30V35H5C3 35 2 36 2 38V42C2 44 3 45 5 45H10V43C10 40 12 38 15 38C18 38 20 40 20 43V45H80V43C80 40 82 38 85 38C88 38 90 40 90 43V45H95C97 45 98 44 98 42V38C98 36 97 35 95 35ZM35 25L42 17H57L70 25H35Z" 
              fill="#e80200"
              opacity="0.8"
            />
            <circle cx="15" cy="43" r="5" fill="#fff" opacity="0.3"/>
            <circle cx="85" cy="43" r="5" fill="#fff" opacity="0.3"/>
          </svg>

          <Title className={classes.errorCode}>404</Title>
          <Title className={classes.title}>Wrong Turn</Title>
          <Text className={classes.description}>
            Looks like you've taken a detour! The page you're looking for has either been moved, 
            deleted, or never existed. Let's get you back on track to pristine vehicle care.
          </Text>

          <div className={classes.buttonContainer}>
            <Link to="/" className={classes.primaryButton} data-testid="404-home-btn">
              Back to Home
            </Link>
            <Link to="/contact-us" className={classes.secondaryButton} data-testid="404-contact-btn">
              Contact Us
            </Link>
          </div>

          <div className={classes.links}>
            <Text className={classes.linksTitle}>Popular Services</Text>
            <div className={classes.quickLinks}>
              <Link to="/services/ceramic-coatings" className={classes.quickLink}>Ceramic Coating</Link>
              <Link to="/services/paint-protection-film" className={classes.quickLink}>Paint Protection Film</Link>
              <Link to="/services/window-tinting" className={classes.quickLink}>Window Tinting</Link>
              <Link to="/services/detailing" className={classes.quickLink}>Auto Detailing</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
};

export default NotFoundPage;

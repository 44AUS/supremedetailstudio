import React from 'react'
import { Title, Image, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import WindowTinting from '../../assets/images/tint/vette-tint.jpg';
import GeoShield from '../../assets/images/partners/Geoshield_Logo_White.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '160px',
    paddingBottom: '160px',
    backgroundImage: `url(${WindowTinting})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
      backgroundAttachment: 'scroll',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'SceneProUltBlkIt, sans-serif',
    fontSize: '56px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textAlign: 'center',
    textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '32px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: 1.8,
    maxWidth: '800px',
    margin: '0 auto',
    [theme.fn.smallerThan('md')]: {
      fontSize: '16px',
      padding: '0 20px',
    },
  },
  overlay: {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  partnerLogo: {
    maxWidth: '150px',
    height: 'auto',
    margin: '0 auto 20px auto',
    display: 'block',
  },
buttonContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
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
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#fff',
      transform: 'translateY(-3px)',
    },
  },
}));

const WindowTintingHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>

      <Container size="lg">
        <div className={classes.inner}>
          <Image src={GeoShield} alt="GeoShield Window Tint" className={classes.partnerLogo} />
          
          <Title className={classes.title}>
            TOP WINDOW TINT SPECIALISTS IN MARIETTA, GA
          </Title>

          <Text className={classes.description}>
            Discover why an increasing number of Marietta, GA drivers are turning to Supreme Detail Studio for all of their window tinting needs. We offer the highest quality window tint at the best price, guaranteed!
          </Text>

          <div className={classes.buttonContainer}>
                                                             <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" className={classes.primaryButton}>
                                                               Book Appointment
                                                             </Link>
                                                             <Link to="tel:5024170690" className={classes.secondaryButton}>
                                                               Call (502) 417-0690
                                                             </Link>
                                                           </div>
        </div>
      </Container>
    </div>
  )
}

export default WindowTintingHero;

import React from 'react'
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import LeatherSeats from '../../assets/images/details/leather-seats.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    // paddingTop: '160px',
    // paddingBottom: '160px',
    backgroundImage: `url(${LeatherSeats})`,
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
    fontFamily: "'Oswald', sans-serif",
    fontSize: '58px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,
    textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '34px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  smallTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#e80200',
    marginBottom: '16px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 600,
    [theme.fn.smallerThan('md')]: {
      fontSize: '12px',
      letterSpacing: '3px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '17px',
    textAlign: 'center',
    lineHeight: 1.8,
    maxWidth: '700px',
    margin: '0 auto',
    fontWeight: 400,
    [theme.fn.smallerThan('md')]: {
      fontSize: '16px',
      padding: '0 20px',
    },
  },
  overlay: {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9))',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
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

const AboutHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>

      <Container size="lg">
        <div className={classes.inner}>
          <Title className={classes.smallTitle}>
            ABOUT US
          </Title>

          <Title className={classes.title}>
            OUR HIGHEST PRIORITY IS YOU.
          </Title>

          <Text className={classes.description}>
            We at Supreme Detail Studio live by the golden rule of treating others how you wish to be treated and to take care of your vehicle as if it were one of our own. Our focus is providing high quality and honest service that is tailored to each of your needs.
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

export default AboutHero;

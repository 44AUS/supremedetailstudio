import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import InteriorProtectionFilm from '../../assets/images/details/bmw-dashboard.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${InteriorProtectionFilm})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontFamily: 'SceneProUltBlkIt',
    fontSize: '70px',
    letterSpacing: '3px',
    paddingLeft: '50px',
    paddingRight: '50px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '30px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  description: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '25px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '20px',
    },
  },
  controls: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '100px',
    paddingRight: '100px',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
  control: {
    marginLeft: '10px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
    },
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

const InteriorProtectionFilmHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          PROFESSIONAL INTERIOR PROTECTION FILM INSTALLATION IN MARIETTA, GA
        </Title>

        <Container>
          <Text size="lg" className={classes.description}>
            Explore the reason behind the growing number of Marietta, GA drivers choosing <span style={{ color: '#e80200', fontWeight: 'bold' }}>Supreme Detail Studio</span> to protect their vehicles interior. This thin film restores, renews, and protects the most trafficked areas in your vehicle like the gloss piano black trim, carbon accents, and anything that's getting scratched between trips.
          </Text>
        </Container>

        <div className={classes.buttonContainer}>
                                        <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" className={classes.primaryButton}>
                                          Book Appointment
                                        </Link>
                                        <Link to="tel:5024170690" className={classes.secondaryButton}>
                                          Call (502) 417-0690
                                        </Link>
                                      </div>
                                      
      </div>
    </div>
  )
}

export default InteriorProtectionFilmHero;
import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Image, Text, Container, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import WindshieldProtectionFilm from '../../assets/images/details/windshield-protection-film.jpg';
import Madico from '../../assets/images/windshield-protection/madico.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    // paddingTop: '160px',
    // paddingBottom: '160px',
    backgroundImage: `url(${WindshieldProtectionFilm})`,
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
    fontSize: '52px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textAlign: 'center',
    textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '28px',
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
    maxWidth: '220px',
    height: 'auto',
    margin: '0 auto 24px auto',
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

const WindshieldProtectionFilmHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
      <div className={classes.partner}>
      <Image src={Madico} alt="Madico" className={classes.partnerLogo} />
      </div>
        <Title className={classes.title}>
          PROFESSIONAL WINDSHIELD PROTECTION FILM INSTALLATION IN MARIETTA, GA
        </Title>

        <Container>
          <Text size="lg" className={classes.description}>
            Explore the reason behind the growing number of Marietta, GA drivers choosing Supreme Detail Studio for windshield protection film. This clear, thin film is applied to the outside of a windshield to help make it more impact-resistant and prevent costly rock chips, pitting, and cracks. The added protection gives owners peace of mind by helping them avoid expensive windshield replacements, calibration fees and insurance premium increases, which according to Kelley Blue Book, costs an average of $1,000.
          </Text>
        </Container>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

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

      </div>
    </div>
  )
}

export default WindshieldProtectionFilmHero;
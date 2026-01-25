import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';

import Onyx from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import OnyxAplicator from '../assets/images/ceramic-coatings/onyx-coating-show.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';

const useStyles = createStyles((theme) => ({
  /* ---------------- HERO ---------------- */

  heroWrapper: {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${Onyx})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
    },
  },

  heroInner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    width: '100%',
  },

  heroSubtitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#e80200',
    marginBottom: '16px',
    textTransform: 'uppercase',
    fontWeight: 600,
    [theme.fn.smallerThan('md')]: {
      fontSize: '12px',
      letterSpacing: '3px',
    },
  },

  heroTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '58px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textTransform: 'uppercase',
    fontWeight: 700,
    textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '34px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },

  heroDescription: {
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255,255,255,0.95)',
    fontSize: '17px',
    lineHeight: 1.8,
    maxWidth: '700px',
    margin: '0 auto',
    [theme.fn.smallerThan('md')]: {
      fontSize: '16px',
      padding: '0 20px',
    },
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), #000)',
    zIndex: 0,
    pointerEvents: 'none',
  },

  /* ---------------- CONTENT ---------------- */

  wrapper: {
    paddingTop: '15px',
    paddingBottom: 80,
    position: 'relative',
  },

  img: {
    borderRadius: '20px',
    width: '100%',
    height: 'auto',
  },

  h1: {
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    fontWeight: 800,
  },

  h2: {
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '28px',
    textTransform: 'uppercase',
    fontWeight: 700,
  },

  WhyDesc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
  },

  servicesList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    lineHeight: 2,
  },

  buttonContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },

  primaryButton: {
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '18px 40px',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
    },
  },

  secondaryButton: {
    border: '2px solid rgba(255,255,255,0.8)',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '16px 38px',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-3px)',
    },
  },
}));

const AlpharettaGAPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Ceramic Coating Alpharetta GA | Supreme Detail Studio</title>
      </Helmet>

      {/* ---------------- HERO ---------------- */}
      <div className={classes.heroWrapper}>
        <div className={classes.overlay}></div>

        <Container size="lg">
          <div className={classes.heroInner}>
            <Title className={classes.heroSubtitle}>
              ALPHARETTA'S TRUSTED CERAMIC COATING EXPERTS
            </Title>

            <Title className={classes.heroTitle}>
              CERAMIC COATING IN ALPHARETTA, GA
            </Title>

            <Text className={classes.heroDescription}>
              Premium ceramic coating, paint protection film, and auto detailing
              services in Alpharetta, Georgia. ONYX certified installation with
              showroom-quality results.
            </Text>

            <div className={classes.buttonContainer}>
              <Link
                to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.primaryButton}
              >
                Book Appointment
              </Link>

              <Link
                to="tel:5024170690"
                className={classes.secondaryButton}
              >
                Call (502) 417-0690
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
            <SimpleGrid cols={2} spacing="xl">
              <img
                src={OnyxAplicator}
                alt="Ceramic coating application Alpharetta GA"
                className={classes.img}
              />

              <div>
                <Title className={classes.h1}>
                  Premium Ceramic Coating in Alpharetta, GA
                </Title>
                <Text className={classes.WhyDesc}>
                  Supreme Detail Studio provides ONYX certified ceramic coating
                  services designed to protect your vehicle against Georgia
                  weather while enhancing gloss and durability.
                </Text>

                <ul className={classes.servicesList}>
                  <li>UV Protection</li>
                  <li>Hydrophobic Coating</li>
                  <li>Deep Gloss Finish</li>
                  <li>2–5+ Year Protection</li>
                </ul>
              </div>

              <div>
                <Title className={classes.h2}>Full Auto Detailing Services</Title>
                <ul className={classes.servicesList}>
                  <li>Paint Protection Film</li>
                  <li>Window Tinting</li>
                  <li>Paint Correction</li>
                  <li>Interior & Exterior Detailing</li>
                </ul>
              </div>

              <img
                src={TeslaInterior}
                alt="Tesla interior detailing Alpharetta GA"
                className={classes.img}
              />
            </SimpleGrid>
          </article>
        </Container>

        <Connecting />
        <Services />
      </main>
    </>
  );
};

export default AlpharettaGAPage;

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import AboutHero from '../components/Heroes/AboutHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import curingLamp from '../assets/images/details/curing-lamp.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '80px',
    paddingBottom: '80px',
    backgroundColor: '#0a0a0a',
  },
  section: {
    marginBottom: '60px',
  },
  img: {
    borderRadius: '12px',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  subtitle: {
    fontFamily: 'SceneProRg, sans-serif',
    color: '#e80200',
    fontSize: '14px',
    lineHeight: 1.6,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '12px',
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
    },
  },
  title: {
    fontFamily: 'SceneProUltBlkIt, sans-serif',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    marginBottom: '20px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '26px',
      textAlign: 'center',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif", 
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '16px',
    lineHeight: 1.8,
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
    },
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: '20px 0',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: '12px',
  },
}));

const AboutPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Expert Vehicle Care Marietta, GA | Supreme Detail Studio</title>
        <meta name='title' content='Expert Vehicle Care Marietta, GA | Supreme Detail Studio' />
        <meta name='description' content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
        <meta name='keywords' content='marietta ga ppf, supreme detail studio, marietta mobile car detailing, marietta window tinting, marietta paint protection film, stek marietta, marietta paint correction' />
        <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
        <meta property="og:title" content='Expert Vehicle Care Marietta, GA | Supreme Detail Studio' />
        <meta property="og:description" content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      </Helmet>

      <AboutHero />

      <div className={classes.wrapper}>
        <Container size="xl">
          {/* First Section */}
          <div className={classes.section}>
            <SimpleGrid
              cols={2}
              spacing={60}
              breakpoints={[
                { maxWidth: 980, cols: 2, spacing: 40 },
                { maxWidth: 755, cols: 1, spacing: 30 },
              ]}
            >
              <div className={classes.imageWrapper}>
                <img src={curingLamp} alt="Curing Lamp Equipment" className={classes.img} />
              </div>
              <div className={classes.contentBlock}>
                <Title className={classes.subtitle}>OUR STUDIO</Title>
                <Title className={classes.title}>Next Generation Equipment</Title>
                <Text className={classes.description}>
                  As an innovative car care studio, Supreme Detail Studio takes detailing and car care to the next level by utilizing the finest paint assessment digital gauges, infrared thermal curing lamps, digital microscope system, pneumatic powered tools, paint refinement machines, automotive rendered lighting, controlled clean room as well as eco-friendly and VOC-compliant chemicals. No imperfection goes undetected and this ensures that our work is flawless prior to delivery.
                </Text>
              </div>
            </SimpleGrid>
          </div>

          {/* Second Section - Reversed */}
          <div className={classes.section}>
            <SimpleGrid
              cols={2}
              spacing={60}
              breakpoints={[
                { maxWidth: 980, cols: 2, spacing: 40 },
                { maxWidth: 755, cols: 1, spacing: 30 },
              ]}
            >
              <div className={classes.contentBlock}>
                <Title className={classes.subtitle}>OUR PROCESS & CARE</Title>
                <Title className={classes.title}>Peace of Mind</Title>
                <Text className={classes.description}>
                  We take great pride in each vehicle we service and work only a select few at a time so each client's vehicle can have the undivided attention it needs. Supreme Detail Studio is fully insured, licensed, certified and our studio is monitored 24/7.
                </Text>
              </div>
              <div className={classes.imageWrapper}>
                <img src={TeslaInterior} alt="Tesla Interior Detailing" className={classes.img} />
              </div>
            </SimpleGrid>
          </div>
        </Container>
      </div>

      <CertifiedInstaller />
    </>
  )
}

export default AboutPage;

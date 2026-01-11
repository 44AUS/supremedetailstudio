import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import data from '../data/why.json';
import { ToastContainer, toast } from 'react-toastify';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input, Textarea} from "@nextui-org/react";
import ContactUsHero from '../components/Heroes/ContactUsHero';
import { Helmet } from 'react-helmet';
import Map from '../components/Map';
import StMatthewsHero from '../components/Heroes/StMatthewsKYHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import Onyx from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import OnyxAplicator from '../assets/images/ceramic-coatings/onyx-coating-applicator.jpg';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import CeramicTabs from '../components/CeramicCoating/CeramicCoatingTabs';
import Services from '../components/Services/Services';
import { Link } from 'react-router-dom';
import CertifiedCeramicComponent from '../components/BenefitsAndImportance/CeramicCertifiedInstaller';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 80,
    position: 'relative',
  },
  img: {
    borderRadius: '20px'
  },
  h1: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
    },
  },
  h1Main: {
    marginTop: '15px',
    marginBottom: '15px',
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    textAlign: 'center',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
    },
  },
  h1Why: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '22px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 20,
      textAlign: 'center',
    },
  },
  WhyDesc: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      textAlign: 'center',
    },
  },
  desc: {
    fontFamily: 'SceneProRg',
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    // marginBottom: '10px',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      textAlign: 'center',
    },
  },
  benefitIcon: {
    fontFamily: `SceneProRg`, 
    fontSize: '16px',
    fontWeight: 800,
    color: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    display: 'flex',
    width: '48px',
    height: '48px',
    border: '2px solid #fff',
    borderRadius: '100%',
    marginBottom: '24px',
    '@media (max-width: 520px)': {
      width: '38px',
      height: '38px',
    },
  },
  cityList: {
    listStyle: 'inside',
    listStyleType: 'disc',
    padding: '10px',
  },
  li: {
    display: 'list-item',
    // lineHeight: 1.8,
    fontWeight: 500,
    fontSize: '15px',
    '@media (max-width: 520px)': {
      textAlign: 'center',
      display: 'list-item',
      // lineHeight: 1.8,
      fontWeight: 500,
      fontSize: '15px',
    },
  },
}));

const AboutPage = () => {
  const { classes } = useStyles();
  const form = useRef();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
      <title>Ceramic Coating Services in St. Matthews, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio</title>
      <meta name='title' content='Ceramic Coating Services in St. Matthews, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio' />
      <meta name='description' content='Protect your car’s paint with ceramic coating! Ceramic coating will keep your car cleaner for longer &amp;amp; will make follow-up car washes easier. Contact our skilled technicians in St. Matthews to schedule an appointment!' />
      <meta name='keywords' content='louisville ky ceramic coating, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta name='og:title' content='Ceramic Coating Services in St. Matthews, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio' />
      <meta name='og:description' content='Protect your car’s paint with ceramic coating! Ceramic coating will keep your car cleaner for longer &amp;amp; will make follow-up car washes easier. Contact our skilled technicians in St. Matthews to schedule an appointment!' />

    </Helmet>
    <StMatthewsHero />
    <Container size="xl">
      <div className={classes.wrapper}>
        <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        >
          <div>
          <img src={Onyx} />
          </div>
         <div>
          <Title className={classes.desc}>THE BEST CERAMIC COATING IN LOUISVILLE, KY</Title>
          <Title className={classes.h1}>Why choose a ceramic coating?</Title>
          <Text className={classes.WhyDesc}>Want to give your precious car’s exteriors extra protection while keeping it free from dirt, stains, and grime? Get top-notch <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline' }}>ceramic coating</Link> in St. Matthews, KY, from Supreme Detail Studio!</Text>
          <Text className={classes.WhyDesc}>While personal care and car washes help maintain your vehicle’s exterior, using regular items is not enough. You’ll need a trusted auto care company like Supreme Detail Studio to receive unparalleled ceramic coating services in Jefferson County, KY. Get in touch with us today, so we can keep your car exterior protected and looking good as new!</Text>
         </div>
        </SimpleGrid>
        <Title className={classes.h1Main}>Ceramic coating protects your paint come rain, sleet, snow or shine</Title>
        <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        >
         <div>
          <Text className={classes.WhyDesc}>With the following benefits, ceramic coating for your vehicle gives you a bang for your buck:</Text>
          <ul role='list' className={classes.cityList}>
          <SimpleGrid
        cols={1}
        spacing="sm"
        breakpoints={[
          { maxWidth: 980, cols: 1, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        >
            <li className={classes.li}>Protection against rust, UV damage, dirt, rain, and more</li>
            <li className={classes.li}>Ease of cleaning and maintenance</li>
            <li className={classes.li}>Cost-effectiveness</li>
            <li className={classes.li}>Smooth and long-lasting finish</li>
            </SimpleGrid>
          </ul>
          <Text className={classes.WhyDesc}>Apart from providing protective coverage for your paint, ceramic coating keeps the aesthetics of your car — even making it appear brand new. Thus, it may help increase your car’s value.</Text>
         </div>
         <div>
          <img src={OnyxAplicator} />
          </div>
        </SimpleGrid>
      </div>
    </Container>
    <CertifiedCeramicComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1Main}>Our Ceramic Coating Packages</Title>
        <CeramicTabs />
        </div>
        </Container>
        </div>
    <Connecting />
    <Services />
    </>
  )
}

export default AboutPage;
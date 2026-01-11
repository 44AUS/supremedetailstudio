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
import AboutHero from '../components/Heroes/AboutHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import curingLamp from '../assets/images/details/curing-lamp.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg'

const useStyles = createStyles((theme) => ({
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
    listStyle: 'outside',
    listStyleType: 'disc'
  },
}));

const AboutPage = () => {
  const { classes } = useStyles();
  const form = useRef();
  const navigate = useNavigate();

  const notify = () => toast.success('Thank you, your message has been sent!', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
  });

  const contactError = () => toast.error('There was an error.', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  return (
    <>
      <Helmet>
      <title>Expert Vehicle Care Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Detailing Reviews Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <AboutHero />
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
          <img src={curingLamp} />
          </div>
         <div>
          <Title className={classes.desc}>OUR STUDIO</Title>
          <Title className={classes.h1}>Next Generation Equipment</Title>
          <Text className={classes.WhyDesc}>As an innovative car care studio, Supreme Detail Studio takes detailing and car care to the next level by utilizing the finest paint assessment digital gauges, infrared thermal curing lamps, digital microscope system, pneumatic powered tools, paint refinement machines, automotive rendered lighting, controlled clean room as well as eco-friendly and VOC-compliant chemicals. No imperfection goes undetected and this ensures that our work is flawless prior to delivery.</Text>
         </div>
         <div>
         <Title className={classes.desc}>OUR PROCESS & CARE</Title>
          <Title className={classes.h1}>Peace of Mind</Title>
          <Text className={classes.WhyDesc}>We take great pride in each vehicle we service and work only a select few at a time so each client’s vehicle can have the undivided attention it needs. Supreme Detail Studio is fully insured, licensed, certified and our studio is monitored 24/7.</Text>
         </div>
         <div>
         <img src={TeslaInterior} />
         </div>
        </SimpleGrid>
      </div>
    </Container>
    <CertifiedInstaller />
    </>
  )
}

export default AboutPage;
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
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import MiddletownKYHero from '../components/Heroes/MiddletownKYHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import curingLamp from '../assets/images/details/curing-lamp.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';
import BMWSteeringWheel from '../assets/images/details/bmw-steering-wheel.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';

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
    // marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      textAlign: 'center',
    },
  },
  ulTitle: {
    fontFamily: `SceneProBold`,
    color: '#e80200',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: 1.8,
    fontWeight: 500,
    // marginTop: '1.25rem',
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
      <title>Auto Detailing Services in Middletown, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio</title>
      <meta name='title' content='Auto Detailing Services in Middletown, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio' />
      <meta name='description' content='Supreme Detail Studio is a reputable car detailer in Middletown, KY. Our car care experts provide top quality auto detailing services. Contact our team today to schedule an appointment!' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Auto Detailing Services in Middletown, KY | Varying Ceramic Coating Packages Available | Supreme Detail Studio' />
      <meta property="og:description" content='Supreme Detail Studio is a reputable car detailer in Middletown, KY. Our car care experts provide top quality auto detailing services. Contact our team today to schedule an appointment!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <MiddletownKYHero />
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
          <Text className={classes.WhyDesc}>Sports cars, high-end vehicles, and luxury cars are significant investments, and it makes sense to protect them as best as you can. Leaving your luxury vehicle to be waxed, shined, and detailed yourself isn't always possible. When it comes to detailing luxury automobiles, Supreme Detail Studio treats them like our own. Cars are a passion that pervades everything we do, and you'll see it in the small details. The attention we pay to each detail on your car and the way we do it makes us one of the best car detail companies in Middletown, KY. In Middletown, KY, we are proud to serve.</Text>
         </div>
         <div>
          <img src={BMWExterior} />
          </div>
        </SimpleGrid>
        <Title className={classes.h1}>Trained Car Detailers In Middletown, KY</Title>
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
          <img src={BMWSteeringWheel} />
          </div>
         <div>
          <Text className={classes.WhyDesc}>Do you want to have your car ready for the showroom? Our exterior detailing services in Middletown, KY will give you the head-turning experience you have always wanted. We offer top-quality exterior auto detailing in Marietta, GA and Middletown, KY to make your car look new from the inside out. You can also add premium add-ons, such as scratch removal and ceramic coating if you want that next level of detail. Call us today for a ride that shines like no other!</Text>
          <Text className={classes.WhyDesc}>Here’s what’s included in our car detailing services:</Text>
          <Text className={classes.ulTitle}>EXTERIOR CAR CLEANING</Text>
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
            <li className={classes.li}>Exterior wash and dry</li>
            <li className={classes.li}>Paint claying</li>
            <li className={classes.li}>Polishing</li>
            <li className={classes.li}>Sealing or Waxing</li>
            </SimpleGrid>
          </ul>
          <Text className={classes.ulTitle}>INTERIOR CAR CLEANING</Text>
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
            <li className={classes.li}>Vacuuming</li>
            <li className={classes.li}>Scrubbing and Brushing</li>
            <li className={classes.li}>Steam Cleaning</li>
            <li className={classes.li}>Glass Cleaning</li>
            <li className={classes.li}>Leather Deep Clean and Conditioning</li>
            <li className={classes.li}>Perfuming</li>
            </SimpleGrid>
          </ul>
         </div>
        </SimpleGrid>
      </div>
    </Container>
    <Connecting />
    <Services />
    </>
  )
}

export default AboutPage;
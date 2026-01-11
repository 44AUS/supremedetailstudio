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
import LouisvilleKYHero from '../components/Heroes/LouisvilleKYHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import curingLamp from '../assets/images/details/curing-lamp.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg'
import Services from '../components/Services/Services';
import BMWInterior from '../assets/images/details/bmw-dashboard.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';

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
      <title>Reputable Car Detailer in Marietta, GA | Auto Detailing Services in Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Reputable Car Detailer in Marietta, GA | Auto Detailing Services in Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Supreme Detail Studio is a reputable car detailer in Marietta, GA. Our car care experts provide top quality auto detailing services. Contact our team today to schedule an appointment!' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Reputable Car Detailer in Marietta, GA | Auto Detailing Services in Marietta, GA | Supreme Detail Studio' />
      <meta property="og:description" content='Supreme Detail Studio is a reputable car detailer in Marietta, GA. Our car care experts provide top quality auto detailing services. Contact our team today to schedule an appointment!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <MariettaKYHero />
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
          <img src={BMWInterior} />
          </div>
         <div>
          <Title className={classes.h1}>Auto Detailing Services in Marietta, GA</Title>
          <Text className={classes.WhyDesc}>Premium investments like your luxury cars require, or should we say demand, premium maintenance, and services. If you’ve been looking for a passionate crew to take good care of your prized rides then look no further than the best car detailing services provider in Marietta, GA.</Text>
          <Text className={classes.WhyDesc}>You can’t just let anyone get their hands on your luxury, high-end cars but you also don’t always have the time to do it all yourself. Besides, you need a crew that has seen it all. Since we’re talking about <Link to="/services/detailing" style={{ textDecoration: 'underline' }}>auto detailing</Link>, then naturally you need experts with uncanny attention to (you guessed it) details!</Text>
          <Text className={classes.WhyDesc}>We live and breathe cars and we shall see to it that yours gets the best treatment possible!</Text>
         </div>
         <div>
          <Title className={classes.h1}>What Does a Car Detailing Include?</Title>
          <Text className={classes.WhyDesc}>The exterior of your car deserves all the pampering it can get. After all, it takes on all sorts of elements and the wear and tear of everyday usage. You need your car to be as presentable as it can be and we have just the right tools and techniques to make it so.</Text>
          <Text className={classes.WhyDesc}>With us, your car will always look as good as new and, of course, luxurious.</Text>
          <Text className={classes.WhyDesc}>Your vehicle should look and feel luxurious inside and out. No detail shall escape our expertise and all surfaces, no matter the material, will be as clean as they can get. You spend a lot of time inside your car so it’s only right to get it detailed to perfection.</Text>
          <Text className={classes.WhyDesc}>A huge part of our mobile auto detailing services here in Marietta, GA, tire detailing. Your tires take the brunt of the legwork to get you from point A to point B, so they not only need to stay in good shape but also highlight your vehicle in style.</Text>
          <Text className={classes.WhyDesc}>Go all-in on our mobile car detailing services and let us work on your dashboard. It’s a very functional part of your car, not to mention the thing most people see when riding in it. It needs to be in tip-top shape, clean, and emit a premium feel at all times.</Text>
          <Text className={classes.WhyDesc}>Stay comfy throughout the ride at all times! Riding in style and luxury is what you deserve. So, let us put in the work and we’ll let you experience what we mean. We’ll enhance the material of your car to the best of our abilities.</Text>
          <Text className={classes.WhyDesc}>We offer more services, like ceramic coating, window tinting., and wheel curb rash repair. Anything you want to be customized, we can certainly do! There are not a lot of things, car-related, that we cannot execute.</Text>
         </div>
         <div>
         <img src={TeslaPlaid} />
         </div>
         <div>
         <img src={TeslaInterior} />
         </div>
         <div>
          <Title className={classes.h1}>Contact Us Today!</Title>
          <Text className={classes.WhyDesc}>We also offer <Link to="/service-areas/middletown-ky" style={{ textDecoration: 'underline' }}>auto detailing in Middletown, KY</Link>, and <Link to="/service-areas/st-matthews-ky" style={{ textDecoration: 'underline' }}>ceramic coating services in St Matthews, KY</Link>. Contact us today and we’ll get right to where you are and work on what you need, is one of the best car detail shops in the state!</Text>
          <Text className={classes.WhyDesc}>We also offer wheel curb rash repair, just give us a ring and we’ll discuss what you want and it shall be done! For luxury car detailing services in Marietta, GA, <Link to="/" style={{ textDecoration: 'underline' }}>Supreme Detail Studio</Link> should be on top of your list. Call us now!</Text>
          <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" variant="shadow" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            Book Appointment
          </Button>
          </Link>
          <Link to="tel:(502) 417-0690" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" variant="shadow" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            CALL (502) 417-0690
          </Button>
          </Link>

          </div>
        </div>
         </div>
        </SimpleGrid>
        <Services />
      </div>
    </Container>
    </>
  )
}

export default AboutPage;
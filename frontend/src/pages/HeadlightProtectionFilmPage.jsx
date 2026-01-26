import React from 'react';
import { Container, Title, Image, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BenefitsOfPPF from '../components/BenefitsAndImportance/BenefitsOfPPF';
import HeadlightProtectionFilmHero from '../components/Heroes/HeadlightProtectionFilmHero';
import PickUpDeliveryService from '../components/PickUpDeliveryService';
import LPFComponent from '../components/PPF/LPF';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import CertifiedInstallerComponent from '../components/BenefitsAndImportance/PPFCertifiedInstaller';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 0,
    position: 'relative',
  },
  h1: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
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
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      textAlign: 'center',
	  },
  },
  partnerLogo: {
    float:'none',
    top: '0px',
    left:0,
    width:'calc(100% - 668px)',
    position:'relative',
    height:'auto',
    paddingTop:'0px',
    paddingLeft:'0px',
    paddingBottom:'0px',
    maxWidth:'252px',
    paddingRight:'0px',
    minWidth:'25px',
    textAlign:'start',
    display:'block',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:'14px',
    marginBottom:'15px',
    [theme.fn.smallerThan('md')]: {
      maxWidth:'152px',
    },
  },
  paper: {
    backgroundColor: '#2f2f2f',
    border: '0px solid',
    borderRadius: 12,
    fontWeight: 600,
    [theme.fn.smallerThan('sm')]: {
    },
  },
  group: {
    padding: 24,
  },
  serviceTitle: {
    color: 'rgba(255, 255, 255, .87)',
    fontSize: 16,
    fontWeight: 600,
  },
  serviceDescription: {
    color: 'rgba(235, 235, 235, .6)',
    paddingTop: 8,
    fontSize: 14,
    fontWeight: 500,
  },
  list: {
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 20,
    },
  },
  listItem: {
    color: '#FFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: '18px',
    margin: 'auto'
  },
  smallHeading: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  control: {
		paddingLeft: 50,
		paddingRight: 50,
		fontFamily: `Outfit, ${theme.fontFamily}`,
		fontSize: '1.125rem',
		fontWeight: 600,
		transition: 'color .25s,border-color .25s,background-color .25s',
		justifyContent: 'center',
		alignItems: 'center',
	
		[theme.fn.smallerThan('md')]: {
		  width: '100%',
		},
  },
  card: {
    backgroundColor: 'rgb(15,15,15)',
    color: '#FFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    border: '1px solid rgba(202,204,255,.1)',
  },

  section: {
    borderBottom: `1px solid rgba(202,204,255,.1)`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    fontFamily: `Outfit, ${theme.fontFamily}`,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const HeadlightProtectionFilmPage = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Light Protection In Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Light Protection In Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Marietta, GA Light Protection' />
      <meta name='keywords' content='louisville ky light Protection, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Light Protection, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Light Protection In Marietta, GA | Supreme Detail Studio' />
      <meta property="og:description" content='Marietta, GA Light Protection' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <HeadlightProtectionFilmHero />
    <VideoIntroduction
          titleProp='WHAT IS LIGHT PROTECTION FILM?'
          descriptionProp={`Light Protection Film (LPF) is a specialized Paint Protection Film (PPF) for automotive lights, enhancing both protection and aesthetics. Available in four tones — DYNOshade, DYNOsmoke, DYNOshadow, and DYNOyellow — LPF safeguards headlights, fog lights, and taillights from daily road hazards like rock chips, insect acids, bird droppings, pollution-induced fading, and surface scratches. Featuring STEK's DYNO top-coat technology, LPF ensures durability and a unique appearance. Covered by a 7-year warranty, STEK continues to innovate in automotive protection.`}
          videoProp='KByfuREsb9A'
          buttonText='View Our Packages'
          buttonLink='https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD'
          />
    {/* <BenefitsOfPPF /> */}
    <CertifiedInstallerComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
      <Title className={classes.h1}>Our Light Protection Film Options</Title>
        <div className={classes.desc}>
        Please allow for flexibility depending on vehicle make & model
        </div>
        <LPFComponent />
      </div>
    {/* <CeramicFAQ /> */}
    </Container>
    <PickUpDeliveryService />
    </div>
    {/* <TellUs /> */}
    </>
  )
}

export default HeadlightProtectionFilmPage;
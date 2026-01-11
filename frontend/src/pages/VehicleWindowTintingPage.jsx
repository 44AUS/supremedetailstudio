import React from 'react';
import { Container, Title, Image, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BenefitsOfPPF from '../components/BenefitsAndImportance/BenefitsOfPPF';
import VehicleWindowTintingHero from '../components/Heroes/VehicleWindowTintingHero';
import Geoshield from '../assets/images/partners/Geoshield_Logo_Color.png';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import AutoTintComponent from '../components/AutoWindowTint';
import CertifiedTintComponent from '../components/BenefitsAndImportance/TintCertifiedInstaller';
import PickUpDeliveryService from '../components/PickUpDeliveryService';
import AutoWindowFAQ from '../components/FAQs/AutoWindowFAQ';
import IsAutoTintForYou from '../components/BenefitsAndImportance/IsAutoTintForYou';
import TintComparison from '../components/BenefitsAndImportance/TintComparison';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 0,
    position: 'relative',
  },
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  h1: {
    marginTop: '15px',
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    marginBottom:'15px',
    '@media (max-width: 520px)': {
      fontSize: 24,
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
  desc: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
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

const VehicleWindowTintingPage = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Vehicle Window Tinting In Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Vehicle Window Tinting In Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Marietta, GA Vehicle Window Tinting' />
      <meta name='keywords' content='louisville ky Vehicle Window Tinting, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Vehicle Window Tinting, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Vehicle Window Tinting In Marietta, GA | Supreme Detail Studio' />
      <meta property="og:description" content='Marietta, GA Vehicle Window Tinting' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <VehicleWindowTintingHero />
    <VideoIntroduction
          titleProp='TRUE INTERIOR PROTECTION FOR YOUR VEHICLE'
          descriptionProp={`If you're looking for maximum performance & protection from your window tint, look no further than the window films we offer here at Supreme Detail Studio. With the latest in Infared Ceramic Window Films, you can see better than ever before without sacrificing your safety. The nano tint utilizes precious metals and rare earth materials to allow for maximum light absorption while rejecting heat from up close or far away allowing a high level of reflectivity that will keep drivers safer on our roads.`}
          videoProp='Pz8x_kA7Ypc'
          buttonText='VIew Our Packages'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI'
          />
    <IsAutoTintForYou />
    {/* <TintComparison /> */}
    <CertifiedTintComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>CHOICE OF NEXT GENERATION AUTOMOTIVE FILM</Title>
        <AutoTintComponent />
      </div>
    {/* <CeramicFAQ /> */}
    <PickUpDeliveryService />
    <AutoWindowFAQ />
    </Container>
    </div>
    {/* <TellUs /> */}
    </>
  )
}

export default VehicleWindowTintingPage;
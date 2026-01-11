import React from 'react';
import { Container, Card, Title, Text, Group, Badge, Image, Button, Center, SimpleGrid, createStyles, getStylesRef, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import InteriorHero from '../components/Heroes/InteriorHero';
import AddOnServices from '../components/Detailing/AddOnServices';
import AddOnHero from '../components/Heroes/AddOnHero';
import WhyAddOns from '../components/BenefitsAndImportance/WhyAddOns';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import TrustedBrands from '../components/BenefitsAndImportance/TrustedBrands';
import { Helmet } from 'react-helmet';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: '4rem',
    position: 'relative',
  },
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  h1: {
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
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
    fontFamily: `Evogria, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  desc: {
    fontFamily: `Evogria, ${theme.fontFamily}`,
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

}));

const AddOnServicesPage = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Expert Vehicle Care Louisville, KY | Supreme Detail Studio</title>
      <meta name='title' content='Expert Vehicle Care Louisville, KY | Supreme Detail Studio' />
      <meta name='description' content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Expert Vehicle Care Louisville, KY | Supreme Detail Studio' />
      <meta property="og:description" content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <AddOnHero />
    <VideoIntroduction
          titleProp='GET YOUR CAR LOOKING LIKE NEW WITHOUT ANY BODY WORK'
          descriptionProp={`Sometimes your vehicle needs a little something extra such as stain removal, pet hair removal, HVAC cleaning, mold remediation, interior protection, exterior protection or car seat cleaning. Supreme Detail Studio has solutions to all your exterior and interior situations.`}
          videoProp='d'
          buttonText='View Our Add-on services'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4'
          />
    <WhyAddOns />
    <TrustedBrands />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1} mt="md">OUR ADDITIONAL SERVICES</Title>
        <AddOnServices />
      </div>
    </Container>
    </div>
    </>
  )
}

export default AddOnServicesPage;
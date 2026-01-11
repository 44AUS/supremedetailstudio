import React from 'react';
import { Container, Title, Text, Button, Card, Image, Group, Badge, createStyles, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import CeramicHero from '../components/Heroes/CeramicHero';
import BenefitsOfCeramic from '../components/BenefitsAndImportance/BenefitsOfCeramic';
import CeramicFAQ from '../components/FAQs/CeramicFAQ';
import { Helmet } from 'react-helmet';
import CeramicCoatingComponent from '../components/CeramicCoating/CeramicCoating';
// SystemX logo not available - removed import
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import ComparisonComponent from '../components/BenefitsAndImportance/ComparisonComponent';
import CertifiedCeramicComponent from '../components/BenefitsAndImportance/CeramicCertifiedInstaller';
import CeramicTabs from '../components/CeramicCoating/CeramicCoatingTabs';
import PickUpDeliveryService from '../components/PickUpDeliveryService';

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
    maxWidth:'352px',
    paddingRight:'0px',
    minWidth:'25px',
    textAlign:'start',
    display:'block',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:'14px',
    marginBottom:'15px',
    [theme.fn.smallerThan('md')]: {
      maxWidth:'252px',
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

const CeramicCoatings = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Ceramic Paint Coating Services in Louisville, KY | Onyx Coating Certified Professionals | Supreme Detail Studio</title>
      <meta name='title' content='Ceramic Paint Coating Services in Louisville, KY | Onyx Coating Certified Professionals | Supreme Detail Studio' />
      <meta name='description' content='Supreme Detail Studio offers the best ceramic paint coating services in Louisville, KY. Visit our website to browse our ceramic coating package options!' />
      <meta name='keywords' content='louisville ky best ceramic coating, supreme detail studio, best louisville mobile car detailing, louisville best ceramic coating, louisville paint correction' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Ceramic Paint Coating Services in Louisville, KY | Onyx Coating Certified Professionals | Supreme Detail Studio' />
      <meta property="og:description" content='Supreme Detail Studio offers the best ceramic paint coating services in Louisville, KY. Visit our website to browse our ceramic coating package options!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <CeramicHero />
    <VideoIntroduction
          titleProp='CERAMIC COATING PACKAGES FOR LOUISVILLE'
          descriptionProp={`Ceramic Coating your paint is the next generation in Paint Protection. It has been designed to form a semi-permanent crystal layer that will make conventional car waxes and sealants obsolete, due their high strength as well an extraordinary levels of gloss. All created by superior cross linking abilities made possible by condensed nanoparticles, leaving you with the aesthetic and performance you've always wanted for you car!`}
          videoProp='dpqVKHSZFYs'
          buttonText='View Our Packages'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv'
          />
    <BenefitsOfCeramic />
    <ComparisonComponent />
    <CertifiedCeramicComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>Our Ceramic Coating Packages</Title>
        <div>
          <Text className={classes.desc}>
            
          </Text>
        </div>
        <CeramicTabs />
      </div>
      <PickUpDeliveryService />
    <CeramicFAQ />
    </Container>
    </div>
    {/* <TellUs /> */}
    </>
  )
}

export default CeramicCoatings;
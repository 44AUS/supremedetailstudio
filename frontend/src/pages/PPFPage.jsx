import React from 'react';
import { Container, Image, Title, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PPFHero from '../components/Heroes/PPFHero';
import BenefitsOfPPF from '../components/BenefitsAndImportance/BenefitsOfPPF';
import PPFComponent from '../components/PPF/PPF';
// import StekRed from '../../src/assets/images/partners/stek--white-red.webp';
// import GSWFWhite from '../../assets/images/partners/GSWFWhite.svg';
// import GSWFBlue from '../../src/assets/images/partners/GSWFBlue.png'; // File not available
import Gallery from '../components/Gallery';
import StagesOfPPF from '../components/BenefitsAndImportance/StagesOfPPF';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import CeramicVsPPF from '../components/BenefitsAndImportance/CeramicVsPPF';
import ComparisonComponent from '../components/BenefitsAndImportance/ComparisonComponent';
import CertifiedInstallerComponent from '../components/BenefitsAndImportance/PPFCertifiedInstaller';
import PickUpDeliveryService from '../components/PickUpDeliveryService';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '15px',
    paddingBottom: '30px',
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

const PPFPage = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>STEK Clear Bra & Paint Protection Film In Marietta, GA: Ultimate Vehicle Shield | Supreme Detail Studio</title>
      <meta name='title' content='STEK Clear Bra & Paint Protection Film In Marietta, GA: Ultimate Vehicle Shield | Supreme Detail Studio' />
      <meta name='description' content='Stop worrying about your vehicle’s paint and start driving in a carefree manner with a PPF from Supreme Detail Studio! Call us today at (502) 417-0690.' />
      <meta name='keywords' content='louisville ky Paint Protection Film, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Paint Protection Film, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='STEK Clear Bra & Paint Protection Film In Marietta, GA: Ultimate Vehicle Shield | Supreme Detail Studio' />
      <meta property="og:description" content='Stop worrying about your vehicle’s paint and start driving in a carefree manner with a PPF from Supreme Detail Studio! Call us today at (502) 417-0690.' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
      
    </Helmet>
    <PPFHero />
    <VideoIntroduction
          titleProp='WHAT IS PAINT PROTECTION FILM?'
          descriptionProp='Whether you drive a luxury car or an average family vehicle, it’s important to protect the paint on your car with quality clear bra film. Paint protection films can provide powerful resistance against rock chips and other road debris that may damage your paint - all while looking good doing so! We install and stand behind only the highest quality paint protection film manufacturers, such as STEK DYNOshield. With a 10 Year Warranty and Self Healing Technology its the absolute best way to keep your vehicle looking brand new every day.'
          videoProp='CHvnFl0NplQ'
          buttonText='View Our Packages'
          buttonLink='https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD'
          />
    <BenefitsOfPPF />
    <ComparisonComponent />
    <CertifiedInstallerComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        {/* <div className={classes.partner}>
        <Link to="https://www.stek-usa.com/" target="_blank">
        <Image src={StekRed} alt="Tesla Model S" className={classes.partnerLogo} />
        </Link>
        </div> */}
        <Title className={classes.h1}>Our Paint Protection Film Packages</Title>
        <div className={classes.desc}>
        Please allow for flexibility depending on vehicle make & model
        </div>
        <PPFComponent />
      </div>
    </Container>
    <PickUpDeliveryService />
    </div>
    <StagesOfPPF />
    </>
  )
}

export default PPFPage;
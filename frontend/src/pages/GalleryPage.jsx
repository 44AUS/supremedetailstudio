import React from 'react';
import { Helmet } from 'react-helmet';
import GalleryHero from '../components/Heroes/GalleryHero';
import SteamClean from '../assets/images/details/steam-clean.jpg';
import BMW760i from '../assets/images/details/bmw-760i.jpg';
import TeslaRear from '../assets/images/details/tesla-rear.jpg';
import OnyxCoating from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import Tesla from '../assets/images/details/tesla-paint-correction.jpg';
import TeslaSteeringWheel from '../assets/images/details/tesla-steering-wheel.jpg';
import Tesla3Interior from '../assets/images/details/tesla-model-3-interior.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import BMWDashboard from '../assets/images/details/bmw-dashboard.jpg';
import BMWSteeringWheel from '../assets/images/details/bmw-steering-wheel.jpg';
import BMWDoorJamb from '../assets/images/details/bmw-door-jamb.jpg';
import BackSeat from '../assets/images/details/bmw-back-seats.jpg';
import OPCPestServices from '../assets/images/details/opc-pest.jpg';
import DefenderInterior from '../assets/images/details/land-rover-defender-interior.jpg';
import GraphenePro from '../assets/images/details/graphene-pro.jpg';
import { Container, Title, Text, Button, createStyles } from '@mantine/core';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    padding: '4rem',
    position: 'relative',
  },
  h1: {
    marginTop: 0,
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
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
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
  WhyDesc: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  bgBody: {
    backgroundColor: '#111',
    // backgroundImage: 'linear-gradient(45deg, #000, #2e2e2e)',
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
  gallery: {
    paddingBottom: '4rem',
  },
}));

const GalleryPage = () => {
  const { classes } = useStyles();

  return (
    <>
    <Helmet>

      <title>Certified Automotive Detailing in Louisville, KY | Supreme Detail Studio</title>
      <meta name='title' content='Certified Automotive Detailing in Louisville, KY | Supreme Detail Studio' />
      <meta name='description' content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta name='keywords' content='louisville ky Paint Protection Film, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Paint Protection Film, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Certified Automotive Detailing in Louisville, KY | Supreme Detail Studio' />
      <meta property="og:description" content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
      
    </Helmet>
    <GalleryHero />
    <div className={classes.bgBody}>
    <Container size="xl">
    <div className={classes.wrapper}>
    <Title className={classes.h1}>OUR GALLERY OF REGULAR DETAILING EXCELLENCE</Title>
    <div>
        <p className={classes.WhyDesc}>We at Supreme Detail Studio aspire to create a professional and comprehensive exhibition of our automotive detailing and paint enhancement projects. In order to properly showcase the exceptional transformation of vehicles we work on, both inside and out, we have built out quite a portfolio of cars, trucks, and SUVs that have received the quality treatments we offer here.</p>
        <p className={classes.WhyDesc}>As a valued customer at Supreme Detail Studio, you will get the privilege of being a star in our Instagram photo gallery once you have your vehicle coated, wrapped, corrected, or detailed. Scroll through our past detailing projects and don’t forget to follow our Instagram page to show love for the lustrous ceramic coatings, protective PPF products, window tint, restorative paint correction packages, and more exhibited on these customer vehicles!</p>
      </div>
      </div>
      <ResponsiveMasonry
      className={classes.gallery}
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                <Zoom>
                <img src={TeslaRear} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={TeslaInterior} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={SteamClean} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={Tesla} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={OPCPestServices} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={OnyxCoating} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={BMWSteeringWheel} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={BMWDashboard} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={BMWDoorJamb} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={BackSeat} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={BMW760i} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={DefenderInterior} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={Tesla3Interior} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={GraphenePro} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                <Zoom>
                <img src={TeslaSteeringWheel} alt="gallery-img" style={{width: "100%", display: "block", padding: '10px'}} />
                </Zoom>
                </Masonry>
            </ResponsiveMasonry>
      </Container>
    </div>

    {/* <TellUs /> */}
    </>
  )
}

export default GalleryPage;
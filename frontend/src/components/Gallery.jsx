import React from 'react';
import { createStyles } from '@mantine/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import DoorJamb from '../assets/images/details/model-s.jpg';
// import SubaruInterior2 from '../assets/images/details/subaru-interior.jpg';
// import SteamClean from '../assets/images/details/steam-clean.jpg';
// import AudiInterior from '../assets/images/details/audi-interior.jpg';
// import CHR from '../assets/images/details/chr.jpg';
// import K5 from '../assets/images/details/k5.jpg';
// import Tesla from '../assets/images/details/tesla-paint-correction.jpg';
// import TeslaSteeringWheel from '../assets/images/details/tesla-steering-wheel.jpg';
// import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
// import DenaliWheels from '../assets/images/details/denali-wheels.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: 0,
    position: 'relative',
  },
  h1: {
    marginTop: 0,
    fontFamily: `Evogria, ${theme.fontFamily}`,
    textAlign: 'center',
    color: '#fff',
    fontSize: '3.13rem',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 28,
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
}));

const Gallery = () => {
  const { classes } = useStyles();

  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1024: {
      items: 3
    }
  };

  return (
    <>
    <AliceCarousel
    duration={200}
    autoPlay={true}
    startIndex={1}
    fadeOutAnimation={true}
    mouseDragEnabled={true}
    autoPlayInterval={1000}
    autoPlayActionDisabled={false}
    responsive={responsive}
    disableDotsControls={true}
    disableButtonsControls={true}
    autoHeight={true}
    autoWidth={true}
    mouseTracking={true}
    infinite={true}
    keyboardNavigation={true}
    >
    {/* <img src={K5} alt="gallery-img" className="gallery-img" />
    <img src={SteamClean} alt="gallery-img" className="gallery-img" />
    <img src={Tesla} alt="gallery-img" className="gallery-img" />
    <img src={TeslaSteeringWheel} alt="gallery-img" className="gallery-img" />
    <img src={SubaruInterior2} alt="gallery-img" className="gallery-img" />
    <img src={AudiInterior} alt="gallery-img" className="gallery-img" />
    <img src={DenaliWheels} alt="gallery-img" className="gallery-img" />
    <img src={TeslaInterior} alt="gallery-img" className="gallery-img" />
    <img src={DoorJamb} alt="gallery-img" className="gallery-img" />
    <img src={CHR} alt="gallery-img" className="gallery-img" /> */}
  </AliceCarousel>
    </>
  )
}

export default Gallery;
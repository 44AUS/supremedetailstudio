import React from 'react';
import { Title, Container, createStyles, keyframes } from '@mantine/core';
import KCbg from '../../assets/images/partners/koch-chemie-bg.webp';
import Meguiars from '../../assets/images/partners/Meguiars.png';
import KochChemie from '../../assets/images/partners/kochchemie-louisville-detailing.svg';
import PandS from '../../assets/images/partners/pands.png';
import Superior from '../../assets/images/partners/Superior-Products-Logo.webp';
import Gyeon from '../../assets/images/partners/gyeon.webp';
import OPT from '../../assets/images/partners/opt.webp';
import Sonax from '../../assets/images/partners/sonax.webp';

// Define the scrolling animation using Mantine's keyframes helper
const scroll = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-1960px)' },
});

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${KCbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontFamily: 'SceneProBold',
    fontSize: '42px',
    letterSpacing: '3px',
    paddingLeft: '50px',
    paddingRight: '50px',
    color: '#FFF',
    marginTop: '15px',
    marginBottom: '17px',
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '20px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  ourPartners: {
    fontFamily: 'SceneProRg',
    fontSize: '14px',
    letterSpacing: '3px',
    paddingLeft: '50px',
    paddingRight: '50px',
    color: '#979797',
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '12px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#979797',
    marginBottom: '70px',
    lineHeight: '1.8',
    textAlign: 'center',
    maxWidth: '660px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  overlay: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, .78)',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  gradient: {
    backgroundImage: 'linear-gradient(rgba(15, 15, 15, 0) 63%, #0f0f0f), linear-gradient(353deg, rgba(0, 0, 0, 0) 49%, rgba(0, 0, 0, .84))',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  scrollContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    // Left gradient fade - uses transparent to blend with your background
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200px',
      height: '100%',
      background: 'linear-gradient(to right, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0) 100%)',
      zIndex: 2,
      pointerEvents: 'none',
      [theme.fn.smallerThan('md')]: {
        width: '100px',
      },
    },
    // Right gradient fade - uses transparent to blend with your background
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '200px',
      height: '100%',
      background: 'linear-gradient(to left, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0) 100%)',
      zIndex: 2,
      pointerEvents: 'none',
      [theme.fn.smallerThan('md')]: {
        width: '100px',
      },
    },
  },
  scrollTrack: {
    display: 'flex',
    gap: '80px',
    // Apply the animation using the keyframes we defined above
    animation: `${scroll} 30s linear infinite`,
    '&:hover': {
      animationPlayState: 'paused',
    },
    [theme.fn.smallerThan('md')]: {
      gap: '60px',
    },
  },
  logoItem: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    minWidth: '200px',
    [theme.fn.smallerThan('md')]: {
      minWidth: '150px',
      height: '60px',
    },
    '& img': {
      maxHeight: '60px',
      maxWidth: '180px',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      // Removed the grayscale filter so logos show in full color
      transition: 'opacity 0.3s ease',
      '&:hover': {
        opacity: 0.8,
      },
      [theme.fn.smallerThan('md')]: {
        maxHeight: '45px',
        maxWidth: '140px',
      },
    },
  },
}));

const TrustedBrands = () => {
  const { classes } = useStyles();

  const logos = [
    { src: KochChemie, alt: 'KochChemie' },
    { src: Meguiars, alt: 'Meguiars' },
    { src: PandS, alt: 'PandS' },
    { src: Superior, alt: 'Superior' },
    { src: Gyeon, alt: 'Gyeon' },
    { src: Sonax, alt: 'Sonax' },
    { src: OPT, alt: 'OPT' },
  ];

  // Duplicate the logos to create seamless infinite scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <div className={classes.gradient}></div>

      <div className={classes.inner}>
        <div>
          <Title className={classes.ourPartners}>
            Brands We Trust
          </Title>
          <Title className={classes.title}>
            Trusted Brands
          </Title>

          <p className={classes.description}>
            Supreme Detail Studio takes pride in using the highest quality detailing products. 
            Through the utilization of top-tier industry products, we assure the quality and 
            integrity of our work.
          </p>
        </div>

        <div className={classes.scrollContainer}>
          <div className={classes.scrollTrack}>
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className={classes.logoItem}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
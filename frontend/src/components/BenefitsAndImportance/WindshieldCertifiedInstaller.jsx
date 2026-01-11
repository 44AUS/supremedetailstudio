import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Text, Image, Container, Button, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import Tint from '../../assets/images/tint/tint.webp';
// import Madico from '../../assets/images/windshield-protection/madico.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${Tint})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    marginBottom: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '20px',
      paddingLeft: '5px',
      paddingRight: '5px',
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
  description: {
    fontFamily: 'SceneProRg',
    color: '#979797',
    marginBottom: '70px',
    lineHeight: '1.8',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  heading: {
    maxWidth: '660px',
    marginRight:'auto',
    marginLeft:'auto',
    marginBottom: '81px',
  },
  controls: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '100px',
    paddingRight: '100px',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
  control: {
    marginLeft: '10px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
    },
  },
  overlay: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, .78)',
    // backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)',
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
  }
}));

const CertifiedWindshieldComponent = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <div className={classes.gradient}></div>

      <div className={classes.inner}>
        <div className={classes.heading}>
        <Title className={classes.title}>
          Certified Installer
        </Title>

        <p className={classes.description}>Supreme Detail Studio is proud to be a certified installer of ClearPlex®. ClearPlex® by Madico® is a clear windshield protection film that protects against UV rays, keeps your windshield intact during an accident, reduces chips, and more!</p>

        </div>

        <div className={classes.partner}>
      <Image src="/images/windshield-protection/madico.svg" alt="Madico" className={classes.partnerLogo} />
      </div>
      </div>
    </div>
  )
}

export default CertifiedWindshieldComponent;
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax';
import { Title, SimpleGrid, Text, Image, Container, Button, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import TRX from '../../assets/images/details/trx.avif';
import GeoShield from '../../assets/images/partners/Geoshield_Logo_Color.png';
import STEK from '../../assets/images/partners/stek--white-red.webp';
import Onyx from '../../assets/images/partners/onyx-logo@2x.webp';
import Madico from '../../assets/images/partners/madico.svg';


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${TRX})`,
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
    fontFamily: "'Montserrat', sans-serif",
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
    fontFamily: "'Montserrat', sans-serif",
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
  partner: {
    display:'block',
    margin:'auto',
    textAlign: 'center',
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
    maxWidth:'250px',
    paddingRight:'0px',
    minWidth:'25px',
    textAlign:'start',
    display:'block',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:'14px',
    marginBottom:'15px',
    [theme.fn.smallerThan('md')]: {
      maxWidth:'250px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
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

const CertifiedInstaller = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <div className={classes.gradient}></div>

      <div className={classes.inner}>
        <div className={classes.heading}>
        <Title className={classes.ourPartners}>
          Our Partners
        </Title>
        <Title className={classes.title}>
          Certified Installer
        </Title>

        <p className={classes.description}>Supreme Detail Studio takes pride in being a certified installer of automotive paint protection film and window tint, complemented by our comprehensive residential and commercial services. Through the utilization of top-tier industry products, we assure the quality and integrity of our products and craftsmanship.</p>

        </div>

<Container size="lg">
  <SimpleGrid
    cols={4}
    spacing="xl"
    breakpoints={[
      { maxWidth: 'md', cols: 2 },
    ]}
  >
    <Image src={STEK} alt="STEK" fit="contain" height={50} />
    <Image src={Onyx} alt="Onyx" fit="contain" height={50} />
    <Image src={Madico} alt="Madico" fit="contain" height={50} />
    <Image src={GeoShield} alt="GeoShield" fit="contain" height={50} />
  </SimpleGrid>
</Container>


        {/* <div className={classes.partner}>
          <Container size="lg">
        <SimpleGrid
      cols={6}
      spacing="lg"
      breakpoints={[
        { maxWidth: '62rem', cols: 6, spacing: 'md' },
        { maxWidth: '48rem', cols: 3, spacing: 'sm' },
      ]}
      >
      <Image src={Onyx} alt="Onyx" className={classes.partnerLogo} />
      <Image src={GSWF} alt="GSWF" className={classes.partnerLogo} />
      <Image src={ExoShield} alt="SystemX" className={classes.partnerLogo} />
      <Image src={GeoShield} alt="GeoShield" className={classes.partnerLogo} />
      </SimpleGrid>
      </Container>
      </div> */}
      </div>
    </div>
  )
}

export default CertifiedInstaller;
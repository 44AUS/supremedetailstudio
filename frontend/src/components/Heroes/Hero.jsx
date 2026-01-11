import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Text, Container, Overlay, createStyles, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import BMWInterior from '../../assets/images/details/bmw-steering-wheel.jpg';
// import FoamBath from '../../assets/videos/Test-video.mp4';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${BMWInterior})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 11,
    maxWidth: '1030px',
    // paddingLeft: '60px',
    // paddingRight: '60px',
    [theme.fn.smallerThan('md')]: {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  title: {
    fontFamily: 'SceneProBold',
    fontSize: '70px',
    letterSpacing: '3px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'left',
    [theme.fn.smallerThan('md')]: {
      fontSize: '30px',
    },
  },
  smallTitle: {
    fontFamily: 'SceneProBold',
    fontSize: '14px',
    letterSpacing: '3px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'left',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
    },
  },
  description: {
    fontFamily: `SceneProRg`,
    color: '#FFF',
    fontSize: '22px',
    textAlign: 'left',
    [theme.fn.smallerThan('md')]: {
      fontSize: '18px',
    },
  },
  controls: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'left',
    paddingLeft: '100px',
    paddingRight: '100px',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
    },
  },
  control: {
    marginLeft: '10px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
    },
  },
  overlay: {
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 88%, rgba(0, 0, 0, .56)), linear-gradient(270deg, rgba(0, 0, 0, 0) 29%, rgba(0, 0, 0, .82)), linear-gradient(rgba(0, 0, 0, 0) 28%, #000)',
    position: 'absolute',
    height: '100%',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  videoBgWrapper: {
    zIndex: 0,
    width: '100%',
    top: 0,
    left: 0,
    borderRadius: 'inherit',
  },
  dmRespRow: {
    float: 'none',
    top: '0',
    left: '0',
    position: 'relative',
    height: 'auto',
    maxWidth: '100%',
    minWidth: '0',
    textAlign: 'start',
    width: 'auto',
    padding: '0 40px',
    margin: '0',
    backgroundImage: 'radial-gradient(circle, #141414 23%, #090909 100%)',
    backgroundOrigin: 'border-box',
  },
  dmRespColsWrapper: {
    display: 'flex',
    maxWidth: '100%',
    position: 'relative',
    margin: '0 auto',
    width: '100%',
  },
  dmRespCol: {
    margin: '0',
    padding: '0',
  },
  dmSpacer: {
    height: '36px',
  },
  dmRespRow2: {
    float: 'none',
    top: '0',
    left: '0',
    position: 'relative',
    height: 'auto',
    maxWidth: '100%',
    minWidth: '0',
    textAlign: 'start',
    width: 'auto',
    padding: '0 40px',
    margin: '0',
    backgroundImage: 'initial',
    backgroundColor: 'transparent',
  },
  dmRespColsWrapper2: {
    display: 'flex',
    maxWidth: '100%',
    position: 'relative',
    margin: '0 auto',
    width: '100%',
  },
  dmRespCol2: {
    margin: '0',
    padding: '0',
  },
  dmSpacer2: {
    height: '36px',
  },
  imageWidget: {
    display: 'block',
    width: '168px',
    margin: '-110px auto 0',
    padding: '0',
    float: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '0',
    left: '0',
    position: 'absolute',
    height: 'auto',
    maxWidth: '100%',
    minWidth: '0',
    textAlign: 'start',
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const Hero = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
    <div className={classes.overlay} />
      
    {/* <div className={classes.videoBgWrapper}>
      <video autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" className={classes.videoBgFrame} poster={coating} src={FoamBath} style={{ objectPosition: '50 50%' }} id="videobgframe-1969141952"></video>
      <div className={classes.overlay}></div>
    </div> */}
    
    <Container size="xl">
      <div className={classes.inner}>

      <Title className={classes.smallTitle}>
          Louisville, KY Vehicle Protection Specialists
        </Title>

        <Title className={classes.title}>
          THE BEST AUTO DETAILING SERVICES IN LOUISVILLE, KY
        </Title>

        
          <Text className={classes.description}>
            Experience the best car detailing services in Louisville, KY at Supreme Detail Studio, the top choice for Louisville residents. 
            Our comprehensive offerings include <Link to="/services/detailing" style={{ textDecoration: 'underline' }}>Auto Detailing</Link>, <Link to="/services/paint-protection-film" style={{ textDecoration: 'underline' }}>Paint Protection Film</Link>, <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline' }}>Ceramic Coating</Link>, <Link to="/services/window-tinting" style={{ textDecoration: 'underline' }}>Window Tinting</Link>, <Link to="/services/paint-correction" style={{ textDecoration: 'underline' }}>Paint Correction</Link>, <Link to="/services/vinyl-wrap-chrome-deletion" style={{ textDecoration: 'underline' }}>Vinyl Wrap & Chrome Deletion</Link>, <Link to="/services/additional-services" style={{ textDecoration: 'underline' }}>and much more</Link>. Our certified professional detailers are committed to delivering superior care, we guarantee your vehicle will leave with a showroom quality finish.
          </Text>
       

        <div className="mx-auto mt-10 flex items-start justify-start max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" style={{ width: '100%', backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            Book Appointment
          </Button>
          </Link>
          <Link to="tel:(502) 417-0690" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            CALL (502) 417-0690
          </Button>
          </Link>

          </div>
        </div>
        
      </div>
      </Container>
    </div>
{/*     
    <div className={classes.dmRespRow} id="1857088181">
      <div className={classes.dmRespColsWrapper} id="1442500482">
        <div className={classes.dmRespCol} id="1457595711">
        <div class={classes.dmSpacer} id="1240896134"></div>
        </div>
      </div> 
    </div>

    <div className={classes.dmRespRow} id="1857088181">
      <div className={classes.dmRespColsWrapper} id="1442500482">
        <div className={classes.dmRespCol} id="1457595711">
          <img src={PremiumBadge} alt="Premium Detailing" class={classes.imageWidget} width="836" height="756" /></div>
      </div> 

    </div> */}
    </>
  )
}

export default Hero;
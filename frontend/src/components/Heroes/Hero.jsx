import React from 'react'
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button} from "@nextui-org/button";
import BMWInterior from '../../assets/images/details/bmw-steering-wheel.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '180px',
    paddingBottom: '180px',
    backgroundImage: `url(${BMWInterior})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '120px',
      paddingBottom: '120px',
      minHeight: '70vh',
      backgroundAttachment: 'scroll',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 11,
    maxWidth: '900px',
    [theme.fn.smallerThan('md')]: {
      paddingLeft: '15px',
      paddingRight: '15px',
      textAlign: 'center',
    },
  },
  title: {
    fontFamily: 'SceneProBold',
    fontSize: '60px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '24px',
    textAlign: 'left',
    lineHeight: 1.1,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '32px',
      textAlign: 'center',
    },
  },
  smallTitle: {
    fontFamily: 'SceneProMedium',
    fontSize: '16px',
    letterSpacing: '4px',
    color: '#e80200',
    marginBottom: '16px',
    textAlign: 'left',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
      textAlign: 'center',
    },
  },
  description: {
    fontFamily: 'SceneProRg',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '18px',
    textAlign: 'left',
    lineHeight: 1.7,
    maxWidth: '800px',
    [theme.fn.smallerThan('md')]: {
      fontSize: '16px',
      textAlign: 'center',
    },
  },
  overlay: {
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.7)), linear-gradient(270deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.85)), linear-gradient(rgba(0, 0, 0, 0) 60%, #000)',
    position: 'absolute',
    height: '100%',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  buttonContainer: {
    marginTop: '40px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    [theme.fn.smallerThan('md')]: {
      justifyContent: 'center',
    },
  },
  link: {
    color: '#e80200',
    textDecoration: 'underline',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#ff1a1a',
    },
  },
}));

const Hero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />
      
      <Container size="xl">
        <div className={classes.inner}>
          <Title className={classes.smallTitle}>
            Marietta, GA Vehicle Protection Specialists
          </Title>

          <Title className={classes.title}>
            THE BEST AUTO DETAILING SERVICES IN MARIETTA, GA
          </Title>

          <Text className={classes.description}>
            Experience the best car detailing services in Marietta, GA at Supreme Detail Studio, the top choice for Marietta residents. 
            Our comprehensive offerings include{' '}
            <Link to="/services/detailing" className={classes.link}>Auto Detailing</Link>,{' '}
            <Link to="/services/paint-protection-film" className={classes.link}>Paint Protection Film</Link>,{' '}
            <Link to="/services/ceramic-coatings" className={classes.link}>Ceramic Coating</Link>,{' '}
            <Link to="/services/window-tinting" className={classes.link}>Window Tinting</Link>,{' '}
            <Link to="/services/paint-correction" className={classes.link}>Paint Correction</Link>,{' '}
            <Link to="/services/vinyl-wrap-chrome-deletion" className={classes.link}>Vinyl Wrap & Chrome Deletion</Link>,{' '}
            <Link to="/services/additional-services" className={classes.link}>and much more</Link>. 
            Our certified professional detailers are committed to delivering superior care, we guarantee your vehicle will leave with a showroom quality finish.
          </Text>
       
          <div className={classes.buttonContainer}>
            <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank" style={{ textDecoration: 'none' }}>
              <Button 
                radius="none" 
                size="lg" 
                style={{ 
                  backgroundColor: '#e80200',
                  fontFamily: 'SceneProBold',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  padding: '0 40px',
                  height: '52px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(232, 2, 0, 0.3)'
                }}
              >
                Book Appointment
              </Button>
            </Link>
            <Link to="tel:(502) 417-0690" style={{ textDecoration: 'none' }}>
              <Button 
                radius="none" 
                size="lg" 
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid #e80200',
                  color: '#fff',
                  fontFamily: 'SceneProBold',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  padding: '0 40px',
                  height: '52px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                Call (502) 417-0690
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero;

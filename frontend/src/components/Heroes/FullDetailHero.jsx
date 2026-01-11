import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import TeslaFoamBath from '../../assets/images/details/tesla-foam-bath.jpg';


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${TeslaFoamBath})`,
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
    fontSize: '70px',
    letterSpacing: '3px',
    paddingLeft: '60px',
    paddingRight: '60px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '30px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  smallTitle: {
    fontFamily: 'SceneProBold',
    fontSize: '14px',
    letterSpacing: '3px',
    paddingLeft: '60px',
    paddingRight: '60px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.fn.smallerThan('md')]: {
      fontSize: '14px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  description: {
    fontFamily: `SceneProRg`,
    color: '#FFF',
    fontSize: '22px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '18px',
    },
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
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
}));

const FullDetailHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          PROFESSIONAL FULL DETAILING SERVICES IN LOUISVILLE, KY
        </Title>

        <Container>
          <Text size="lg" className={classes.description}>
            At Supreme Detail Studio, we take <span style={{ fontWeight: 'bold' }}>full detailing in Marietta</span> to a whole new level. Our owner, with almost a decade of experience, ensures your vehicle will leave our shop looking its absolute best!
          </Text>
        </Container>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/5LTnIxwkaRtzxp8x1Ixg" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" variant="shadow" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            Book Appointment
          </Button>
          </Link>
          <Link to="tel:(502) 417-0690" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          radius="none" size="md" variant="shadow" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            CALL (502) 417-0690
          </Button>
          </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FullDetailHero;
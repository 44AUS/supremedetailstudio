import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Image, Text, Container, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import WindshieldProtectionFilm from '../../assets/images/details/windshield-protection-film.jpg';
import Madico from '../../assets/images/windshield-protection/madico.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${WindshieldProtectionFilm})`,
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
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
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
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
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
}));

const WindshieldProtectionFilmHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
      <div className={classes.partner}>
      <Image src={Madico} alt="Madico" className={classes.partnerLogo} />
      </div>
        <Title className={classes.title}>
          PROFESSIONAL WINDSHIELD PROTECTION FILM INSTALLATION IN LOUISVILLE, KY
        </Title>

        <Container>
          <Text size="lg" className={classes.description}>
            Explore the reason behind the growing number of Marietta, GA drivers choosing Supreme Detail Studio for windshield protection film. This clear, thin film is applied to the outside of a windshield to help make it more impact-resistant and prevent costly rock chips, pitting, and cracks. The added protection gives owners peace of mind by helping them avoid expensive windshield replacements, calibration fees and insurance premium increases, which according to Kelley Blue Book, costs an average of $1,000.
          </Text>
        </Container>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
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

export default WindshieldProtectionFilmHero;
import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import InteriorProtectionFilm from '../../assets/images/details/bmw-dashboard.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${InteriorProtectionFilm})`,
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
    fontFamily: 'SceneProUltBlkIt',
    fontSize: '70px',
    letterSpacing: '3px',
    paddingLeft: '50px',
    paddingRight: '50px',
    color: '#FFF',
    marginBottom: '10px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '30px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  description: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '25px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '20px',
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
  }
}));

const InteriorProtectionFilmHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          PROFESSIONAL INTERIOR PROTECTION FILM INSTALLATION IN LOUISVILLE, KY
        </Title>

        <Container>
          <Text size="lg" className={classes.description}>
            Explore the reason behind the growing number of Marietta, GA drivers choosing <span style={{ color: '#e80200', fontWeight: 'bold' }}>Supreme Detail Studio</span> to protect their vehicles interior. This thin film restores, renews, and protects the most trafficked areas in your vehicle like the gloss piano black trim, carbon accents, and anything that's getting scratched between trips.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          className={classes.control} 
          size="lg"
          styles={(theme) => ({
            root: {
              backgroundColor: 'rgba(0,0,0,0)',
              border: '2px solid #e80200',
              fontFamily: `SceneProRg`,
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '1px',
              borderRadius: '0px',
              '&:hover': {
                backgroundColor: '#e80200',
                boxShadow: '0 0 4px 0 #e80200',
              },
            },
          })}
          >
            Book Appointment
          </Button>
          </Link>
          <Link to="tel:(502) 417-0690" target="_blank" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <Button 
          className={classes.control} 
          size="lg"
          styles={(theme) => ({
            root: {
              backgroundColor: 'rgba(0,0,0,0)',
              border: '2px solid #e80200',
              fontFamily: `SceneProRg`,
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '1px',
              borderRadius: '0px',
              '&:hover': {
                backgroundColor: '#e80200',
                boxShadow: '0 0 4px 0 #e80200',
              },
            },
          })}
          >
            Call (502) 417-0690
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InteriorProtectionFilmHero;
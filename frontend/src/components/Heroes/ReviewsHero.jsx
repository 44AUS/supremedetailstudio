import React from 'react'
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import Review from '../../assets/images/details/porsche.jpg';
import {Button, ButtonGroup} from "@nextui-org/button";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    // paddingTop: '160px',
    // paddingBottom: '160px',
    backgroundImage: `url(${Review})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    [theme.fn.smallerThan('md')]: {
      paddingTop: '100px',
      paddingBottom: '100px',
      minHeight: '80vh',
      backgroundAttachment: 'scroll',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 11,
    maxWidth: '850px',
    [theme.fn.smallerThan('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
      textAlign: 'center',
    },
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '62px',
    letterSpacing: '2px',
    color: '#FFF',
    marginBottom: '28px',
    textAlign: 'left',
    lineHeight: 1.1,
    textTransform: 'uppercase',
    fontWeight: 700,
    textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
    [theme.fn.smallerThan('md')]: {
      fontSize: '36px',
      textAlign: 'center',
    },
  },
  smallTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#e80200',
    marginBottom: '20px',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 600,
    [theme.fn.smallerThan('md')]: {
      fontSize: '12px',
      textAlign: 'center',
      letterSpacing: '3px',
    },
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    textAlign: 'left',
    lineHeight: 1.8,
    maxWidth: '750px',
    fontWeight: 400,
    [theme.fn.smallerThan('md')]: {
      fontSize: '15px',
      textAlign: 'center',
    },
  },
  overlay: {
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 30%)',
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
    gap: '20px',
    flexWrap: 'wrap',
    [theme.fn.smallerThan('md')]: {
      justifyContent: 'center',
      gap: '16px',
    },
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '18px 40px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(232, 2, 0, 0.6)',
    },
    [theme.fn.smallerThan('md')]: {
      padding: '16px 32px',
      fontSize: '14px',
    },
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '16px 38px',
    textDecoration: 'none',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#fff',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)',
    },
    [theme.fn.smallerThan('md')]: {
      padding: '14px 30px',
      fontSize: '14px',
    },
  },
  link: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    textDecoration: 'underline',
    borderBottom: '1px solid transparent',
    transition: 'all 0.3s ease',
    // '&:hover': {
    //   color: '#ff4444',
    //   borderBottom: '1px solid #ff4444',
    // },
  },
}));


const ReviewsHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />

      <Container size="xl">
      <div className={classes.inner}>

      <Title className={classes.smallTitle}>
      THE BEST AUTO DETAILING IN MARIETTA, GA
        </Title>

        <Title className={classes.title}>
        AT SUPREME DETAIL STUDIO, OUR EXPERIENCE SHOWS THROUGH GOOGLE REVIEWS
        </Title>

        <Container>
        <Text className={classes.description}>
            Experience the best 5 start rated car detailing services in Marietta, GA at Supreme Detail Studio, the top choice for Marietta residents. 
            Our comprehensive offerings include <Link to="/services/detailing" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Auto Detailing</Link>, <Link to="/services/paint-protection-film" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Paint Protection Film</Link>, <Link to="/services/ceramic-coatings" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Ceramic Coating</Link>, <Link to="/services/window-tinting" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Window Tinting</Link>, <Link to="/services/paint-correction" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Paint Correction</Link>, <Link to="/services/vinyl-wrap-chrome-deletion" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>Vinyl Wrap & Chrome Deletion</Link>, <Link to="/services/additional-services" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>and much more</Link>. Our certified professional detailers are committed to delivering superior care, we guarantee your vehicle will leave with a showroom quality finish.
          </Text>
        </Container>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

                    <div className={classes.buttonContainer}>
                                <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" className={classes.primaryButton}>
                                  Book Appointment
                                </Link>
                                <Link to="tel:5024170690" className={classes.secondaryButton}>
                                  Call (502) 417-0690
                                </Link>
                              </div>

          </div>
        </div>

      </div>
      </Container>
    </div>
  )
}

export default ReviewsHero;
import React from 'react'
import { Title, Text, Container, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import Review from '../../assets/images/details/porsche.jpg';
import {Button, ButtonGroup} from "@nextui-org/button";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `url(${Review})`,
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
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: 1.8,
    maxWidth: '800px',
    margin: '0 auto',
    [theme.fn.smallerThan('md')]: {
      fontSize: '16px',
      padding: '0 20px',
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
    maxWidth:'152px',
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
  buttonContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
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
    },
  },
}));


const ReviewsHero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />

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
    </div>
  )
}

export default ReviewsHero;
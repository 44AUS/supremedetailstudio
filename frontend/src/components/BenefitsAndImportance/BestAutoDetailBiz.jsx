      import React from 'react'
      import { SimpleGrid } from '@mantine/core';
      import { Container, Title, Text, createStyles } from '@mantine/core';
      // import PorscheGreen from '../../assets/images/ppf/green-ppf.jpg'
      // import GlossyCarbon from '../../assets/images/ppf/glossy-carbon.jpeg'
      import Corvette from '../../assets/images/ppf/dynoshield.jpg'
      import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import PPFMasonryHome from '../PPFMasonryHome';
import Zoom from 'react-medium-image-zoom'
      
      const useStyles = createStyles((theme) => ({
        bgBody: {
          backgroundColor: '#111',
          backgroundImage: 'linear-gradient(45deg, #000, #2e2e2e)',
        },
        wrapper: {
          paddingTop: '4rem',
          paddingBottom: '4rem',
          position: 'relative',
        },
        img: {
          borderRadius: '20px'
        },
        h1: {
          marginTop: 0,
          fontFamily: 'SceneProUltBlkIt',
          color: '#fff',
          fontSize: '32px',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          fontWeight: 800,
          animation: 'fadein 1s',
          '@media (max-width: 520px)': {
            fontSize: 24,
            textAlign: 'center',
          },
        },
        h1Why: {
          marginTop: 0,
          fontFamily: "'Montserrat', sans-serif",
          textAlign: 'center',
          color: '#fff',
          fontSize: '22px',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          fontWeight: 800,
          animation: 'fadein 1s',
          '@media (max-width: 520px)': {
            fontSize: 20,
            textAlign: 'center',
          },
        },
        WhyDesc: {
          fontFamily: "'Montserrat', sans-serif",
          color: '#fff',
          fontSize: '15px',
          lineHeight: 1.8,
          fontWeight: 500,
          marginTop: '1.25rem',
          marginBottom: '1.25rem',
          animation: 'fadein 1s',
          '@media (max-width: 520px)': {
            textAlign: 'center',
          },
        },
        desc: {
          fontFamily: "'Montserrat', sans-serif",
          color: '#e80200',
          fontSize: '1.25rem',
          lineHeight: 1.6,
          fontWeight: 500,
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
          animation: 'fadein 1s',
          '@media (max-width: 520px)': {
            fontSize: '16px',
            textAlign: 'center',
          },
        },
        benefitIcon: {
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '16px',
          fontWeight: 800,
          color: '#FFF',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          display: 'flex',
          width: '48px',
          height: '48px',
          border: '2px solid #fff',
          borderRadius: '100%',
          marginBottom: '24px',
          '@media (max-width: 520px)': {
            width: '38px',
            height: '38px',
          },
        },
        cityList: {
          fontFamily: "'Montserrat', sans-serif",
          color: '#FFF',
          listStyle: 'inside',
          listStyleType: 'disc',
          padding: '10px'
        },
        li: {
          display: 'list-item',
          color: '#FFF',
          // lineHeight: 1.8,
          fontWeight: 500,
          fontSize: '15px',
          '@media (max-width: 520px)': {
            textAlign: 'center',
            display: 'list-item',
            // lineHeight: 1.8,
            fontWeight: 500,
            fontSize: '15px',
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
      const BestDetailBiz = () => {
          const { classes } = useStyles();
      
        return (
          <>
            <Container size="xl">
            <div className={classes.wrapper}>
          <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        >
          <div>
            <PPFMasonryHome />
          {/* <img src={PorscheGreen} style={{ marginBottom: '1.25rem' }} />
          <img src={GlossyCarbon} /> */}
          </div>
         <div>
          <Title className={classes.desc}>WE SET A HIGH STANDARD FOR ALL TYPES OF DETAILING SERVICES</Title>
          <Title className={classes.h1}>BEST AUTO DETAILING COMPANY IN MARIETTA, GA</Title>
          <Text className={classes.WhyDesc}>Located in Marietta, Georgia, we are a dedicated protection and detailing team specializing in a wide range of premium services. Our offerings include advanced <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline' }}>ceramic coating</Link> solutions for street vehicles, boats, and industrial or agricultural equipment, as well as residential properties. Additionally, we provide top-tier <Link to="/services/paint-protection-film" style={{ textDecoration: 'underline' }}>paint protection film</Link> products and professional-grade <Link to="/services/window-tinting" style={{ textDecoration: 'underline' }}>window tinting</Link> for all vehicle makes and models. No matter the type of vehicle or machinery you need serviced, our meticulous attention to detail and state-of-the-art techniques guarantee unmatched care and protection for your valuable assets.</Text>
                <Zoom>
                <img src={Corvette} alt="gallery-img" style={{width: "100%", display: "block", marginBottom: '1.25rem' }} />
                </Zoom>
          <Title className={classes.h1}>PPF CERTIFIED INSTALLER IN MARIETTA, GA</Title>
          <Text className={classes.WhyDesc}>Welcome to Supreme Detail Studio, where luxury and convenience converge seamlessly. Proudly located in Marietta, GA, we are recognized as one of the top auto detailing companies in the area. While our expertise lies in detailing luxury vehicles, we go beyond boundaries. We also take pride in being a leading provider of paint protection film (PPF) installation for luxury cars, boats, motorcycles, and everything in between.</Text>
          
          <Text className={classes.WhyDesc}>Our other services include <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline' }}>Ceramic Paint Coating</Link>, <Link to="/services/residential" style={{ textDecoration: 'underline' }}>Home Coatings</Link>, <Link to="/services/vinyl-wrap-chrome-deletion" style={{ textDecoration: 'underline' }}>Vinyl Wrap & Chrome Deletion</Link>, and more. At Supreme Detail Studio, precision is our hallmark. Through dedicated focus on every detail, we've risen above local competition to establish ourselves as a top automotive detailing choice for residents across Georgia, spanning Cobb County, GA, Dekalb County, GA, Fulton County, GA, and Douglas County, GA.</Text>
          
          <Text className={classes.WhyDesc}>Supreme Detail Studio is committed to embracing all our offered services and expanding our customer base in and around Marietta, Georgia. Whether you need vehicle detailing or ceramic coating and tinting for your home or office, we proudly assist clients from the following areas:</Text>
          <ul role='list' className={classes.cityList}>
          <SimpleGrid
        cols={3}
        spacing="sm"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
        ]}
        >
            <Link to="/service-areas/marietta-ga" style={{ textDecoration: 'underline' }}><li className={classes.li}>Marietta, GA</li></Link>
            <li className={classes.li}>Smyrna, GA</li>
            <li className={classes.li}>Roswell, GA</li>
            <Link to="/service-areas/atlanta-ga" style={{ textDecoration: 'underline' }}><li className={classes.li}>Atlanta, GA</li></Link>
            <Link to="/service-areas/sandy-springs-ga" style={{ textDecoration: 'underline' }}><li className={classes.li}>Sandy Springs, GA</li></Link>
            <li className={classes.li}>Alpharetta, GA</li>
            <li className={classes.li}>Acworth, GA</li>
            <li className={classes.li}>Woodstock, GA</li>
            <li className={classes.li}>Austell, GA</li>
            <Link to="/service-areas/kennesaw-ga" style={{ textDecoration: 'underline' }}><li className={classes.li}>Kennesaw, GA</li></Link>
            <li className={classes.li}>Lithia Springs, GA</li>
            <li className={classes.li}>Douglasville, GA</li>
            </SimpleGrid>
          </ul>
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
        </SimpleGrid>
        </div>
        </Container>
          </>
        )
      }
      
      export default BestDetailBiz;
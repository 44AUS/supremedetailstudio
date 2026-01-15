      import React from 'react'
      import { SimpleGrid } from '@mantine/core';
      import { Container, Title, Text, createStyles } from '@mantine/core';
      import TeslaTint from '../../assets/images/tint/tesla-tint.jpg';
      import Tint2 from '../../assets/images/tint/tint-2.jpg';
      import VetteTint from '../../assets/images/tint/vette-tint.jpg';
      import {Button, ButtonGroup} from "@nextui-org/button";
      import { Link } from 'react-router-dom';
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
        h1: {
          marginTop: 0,
          fontFamily: "'Montserrat', sans-serif",
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
        h1smaller: {
          marginTop: 0,
          fontFamily: "'Montserrat', sans-serif",
          color: '#fff',
          fontSize: '30px',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          fontWeight: 800,
          animation: 'fadein 1s',
          '@media (max-width: 520px)': {
            fontSize: 22,
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
          fontFamily: 'SceneProRg',
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
          listStyle: 'outside',
          listStyleType: 'initial'
        },
      }));
      const TintYourRide = () => {
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
          <Title className={classes.desc}>TINT INSTALLATION THAT EXCEEDS ALL EXPECTATIONS</Title>
          <Title className={classes.h1}>TINT YOUR RIDE, HOME, OR OFFICE WITH THE HELP OF SUPREME DETAIL STUDIO</Title>
          <Text className={classes.WhyDesc}>At Supreme Detail Studio, located in Marietta, Georgia, we maintain a consistent standard across all our services: a strong emphasis on customer care. Within the detailing industry, we've distinguished ourselves by focusing intensely on our <Link to="/reviews" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>customers'</Link> needs. Our core principle is centered on treating each vehicle, boat, or property with meticulous care and precision, as if it were our own. This personalized approach deeply connects with clients who seek more than just typical detailing; we cater to individuals who passionately entrust us with protecting and preserving what matters most to them.</Text>
          <Title className={classes.h1smaller}>PROFESSIONAL PAINT PROTECTION FILM INSTALLATION IN MARIETTA, GA</Title>
          <Text className={classes.WhyDesc}>In vehicle detailing, <Link to="/team" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline', borderBottom: '1px solid transparent', transition: 'all 0.3s ease', }}>the team at Supreme Detail Studio</Link> sets itself apart with our extensive knowledge of the various types of vehicles we work on. With nearly a decade of experience, our owner specializes in applying ceramic coatings to vehicles and installing paint protection film on diverse and luxury cars. Austin has been trained by Steve Costa, who is highly regarded in the PPF industry with over 30 years of experience, further enhancing our capability to deliver exceptional service and quality.</Text>
          <Text className={classes.WhyDesc}>We are committed to delivering exceptional customer service right from the very beginning. Whether it's a thorough clean-up after a lengthy trip or a detailed enhancement to revive your vehicle's luster, our skilled professionals ensure each project is completed with a commitment to perfection.</Text>

          {/* <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
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
        </div> */}

         </div>
          <div>
          <Zoom>
          <img src={TeslaTint} style={{ width: "100%", display: "block", padding: '10px' }} />
          <SimpleGrid
        cols={2}
        spacing="xs"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
        ]}
        >
          <Zoom><img src={VetteTint} style={{ width: "100%", display: "block", padding: '10px' }} /></Zoom>
          <Zoom><img src={Tint2} style={{ width: "100%", display: "block", padding: '10px' }} /></Zoom>
        </SimpleGrid>
          </Zoom>
          </div>
        </SimpleGrid>
        </div>
        </Container>
          </>
        )
      }
      
      export default TintYourRide;
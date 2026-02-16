import React from 'react';
import { Container, SimpleGrid, Title, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/button";
import StarlightHeadlinerHero from '../components/Heroes/StarlightHeadlinerHero';
import PickUpDeliveryService from '../components/PickUpDeliveryService';
import Map from '../components/Map';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  bgBodyAlt: {
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
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
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
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      textAlign: 'center',
    },
  },
  WhyDesc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.8,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  bodyText: {
    fontFamily: 'SceneProRg',
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.8,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
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
  processStep: {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(202,204,255,.1)',
    borderRadius: '12px',
    padding: '32px 24px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(232, 2, 0, 0.3)',
      transform: 'translateY(-4px)',
    },
  },
  stepNumber: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '40px',
    fontWeight: 700,
    color: '#e80200',
    marginBottom: '16px',
    lineHeight: 1,
  },
  stepTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  stepDesc: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.7,
  },
  faqItem: {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(202,204,255,.1)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '16px',
  },
  faqQuestion: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '17px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '12px',
  },
  faqAnswer: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.8,
  },
}));

const StarlightHeadlinerPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Starlight Headliner Installation in Marietta, GA | Supreme Detail Studio</title>
        <meta name='title' content='Starlight Headliner Installation in Marietta, GA | Supreme Detail Studio' />
        <meta name='description' content='Custom starlight headliner installation in Marietta, GA. Transform your vehicle interior with a stunning fiber optic night-sky ceiling. Call Supreme Detail Studio at (502) 417-0690.' />
        <meta name='keywords' content='starlight headliner marietta ga, fiber optic headliner installation, custom car interior marietta, starlight roof, rolls royce headliner, car headliner stars, supreme detail studio' />
        <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
        <meta property="og:title" content='Starlight Headliner Installation in Marietta, GA | Supreme Detail Studio' />
        <meta property="og:description" content='Custom starlight headliner installation in Marietta, GA. Transform your vehicle interior with a stunning fiber optic night-sky ceiling.' />
      </Helmet>

      <StarlightHeadlinerHero />

      {/* What Is a Starlight Headliner Section */}
      <div className={classes.bgBody}>
        <Container size="xl">
          <div className={classes.wrapper}>
            <Title className={classes.h1}>What Is A Starlight Headliner?</Title>
            <p className={classes.bodyText}>
              A starlight headliner is a custom interior modification that uses hundreds of fiber optic strands woven into your vehicle's headliner to create a mesmerizing night-sky effect. Originally made famous by Rolls-Royce, this luxury upgrade is now available for any vehicle. Each installation is custom-tailored to your preferences — from the number of stars and brightness levels to shooting star effects and color options.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '32px', flexWrap: 'wrap' }}>
              <Link to="/book-appointment" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
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
        </Container>
      </div>

      {/* Benefits Section */}
      <div className={classes.bgBodyAlt}>
        <Container size="xl">
          <div className={classes.wrapper}>
            <Title className={classes.h1}>Why Choose A Starlight Headliner?</Title>
            <div className={classes.desc}>
              The Ultimate Interior Upgrade
            </div>
            <SimpleGrid
              cols={3}
              spacing="xl"
              breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 1, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
              ]}
            >
              <div>
                <div className={classes.benefitIcon}><div>1</div></div>
                <h1 className={classes.h1Why}>Luxury Aesthetic</h1>
                <p className={classes.WhyDesc}>A starlight headliner instantly transforms your vehicle's interior into a luxury experience. The twinkling fiber optic stars create an ambiance that rivals the most prestigious automotive brands.</p>
              </div>
              <div>
                <div className={classes.benefitIcon}><div>2</div></div>
                <h1 className={classes.h1Why}>Fully Customizable</h1>
                <p className={classes.WhyDesc}>Choose your star count, brightness levels, fiber colors, and even add shooting star effects. Every installation is uniquely tailored to match your vision and personal style.</p>
              </div>
              <div>
                <div className={classes.benefitIcon}><div>3</div></div>
                <h1 className={classes.h1Why}>Increased Vehicle Value</h1>
                <p className={classes.WhyDesc}>A professionally installed starlight headliner is a high-end modification that adds value and desirability to your vehicle, making it stand out from the rest.</p>
              </div>
            </SimpleGrid>
          </div>
        </Container>
      </div>

      {/* Our Process Section */}
      <div className={classes.bgBody}>
        <Container size="xl">
          <div className={classes.wrapper}>
            <Title className={classes.h1}>Our Installation Process</Title>
            <div className={classes.desc}>
              Professional Quality From Start To Finish
            </div>
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: '62rem', cols: 2, spacing: 'md' },
                { maxWidth: '48rem', cols: 1, spacing: 'sm' },
              ]}
              style={{ marginTop: '2rem' }}
            >
              <div className={classes.processStep}>
                <div className={classes.stepNumber}>01</div>
                <div className={classes.stepTitle}>Consultation</div>
                <div className={classes.stepDesc}>We discuss your vision — star density, color preferences, shooting star effects, and brightness levels to create the perfect design.</div>
              </div>
              <div className={classes.processStep}>
                <div className={classes.stepNumber}>02</div>
                <div className={classes.stepTitle}>Headliner Removal</div>
                <div className={classes.stepDesc}>Your vehicle's headliner is carefully removed to ensure a clean workspace. We take every precaution to protect your interior.</div>
              </div>
              <div className={classes.processStep}>
                <div className={classes.stepNumber}>03</div>
                <div className={classes.stepTitle}>Fiber Optic Install</div>
                <div className={classes.stepDesc}>Hundreds of fiber optic strands are individually hand-woven through the headliner material, creating a seamless and natural star pattern.</div>
              </div>
              <div className={classes.processStep}>
                <div className={classes.stepNumber}>04</div>
                <div className={classes.stepTitle}>Final Assembly</div>
                <div className={classes.stepDesc}>The headliner is reinstalled with precision, the light engine is wired, and everything is tested to ensure a flawless finish.</div>
              </div>
            </SimpleGrid>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className={classes.bgBodyAlt}>
        <Container size="xl">
          <div className={classes.wrapper}>
            <Title className={classes.h1}>Frequently Asked Questions</Title>
            <div className={classes.desc}>
              Everything You Need To Know
            </div>
            <div style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>How long does a starlight headliner installation take?</div>
                <div className={classes.faqAnswer}>Most installations take 1-3 days depending on the complexity of the design, the number of stars, and your vehicle type. We'll provide an estimated timeline during your consultation.</div>
              </div>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>Will this damage my vehicle's headliner?</div>
                <div className={classes.faqAnswer}>No. Our professional installation process is designed to be non-destructive. The headliner is carefully removed and reinstalled. If you ever want to revert, it can be returned to its original state.</div>
              </div>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>How many stars are included in the installation?</div>
                <div className={classes.faqAnswer}>The star count is fully customizable. Most installations range from 200 to 1,000+ stars depending on your preference and budget. More stars create a denser, more dramatic night-sky effect.</div>
              </div>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>Can I choose the color of the stars?</div>
                <div className={classes.faqAnswer}>Absolutely. We offer a variety of fiber optic colors including white, blue, purple, and multicolor RGB options. Some setups allow you to change colors with a remote control.</div>
              </div>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>Do you offer shooting star effects?</div>
                <div className={classes.faqAnswer}>Yes! Shooting star effects can be added to your installation for a dynamic, eye-catching look. These are controlled by the light engine and can be toggled on or off.</div>
              </div>
              <div className={classes.faqItem}>
                <div className={classes.faqQuestion}>What vehicles can have a starlight headliner installed?</div>
                <div className={classes.faqAnswer}>Almost any vehicle with a removable headliner can have a starlight installation. This includes sedans, SUVs, trucks, and even boats. Contact us to confirm compatibility with your specific vehicle.</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <PickUpDeliveryService />
      <Map />
    </>
  );
};

export default StarlightHeadlinerPage;

import React from 'react';
import { Container, Title, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import DetailingServices from '../components/Detailing/DetailingServices';
import DetailingFAQ from '../components/Detailing/DetailingFAQ';
import { Helmet } from 'react-helmet';
import HeadlightRestorationHero from '../components/Heroes/HeadlightRestorationHero';
import ImportanceHeadlights from '../components/BenefitsAndImportance/ImportanceHeadlights';
import WhyUsHeadlights from '../components/BenefitsAndImportance/WhyUsHeadlights';
import TrustedBrands from '../components/BenefitsAndImportance/TrustedBrands';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import Map from '../components/Map';
import {Button, ButtonGroup} from "@nextui-org/button";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    position: 'relative',
  },
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  h1: {
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
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
  paper: {
    backgroundColor: '#2f2f2f',
    border: '0px solid',
    borderRadius: 12,
    fontWeight: 600,
    [theme.fn.smallerThan('sm')]: {
    },
  },
  group: {
    padding: 24,
  },
  serviceTitle: {
    color: 'rgba(255, 255, 255, .87)',
    fontSize: 16,
    fontWeight: 600,
  },
  serviceDescription: {
    color: 'rgba(235, 235, 235, .6)',
    paddingTop: 8,
    fontSize: 14,
    fontWeight: 500,
  },
  list: {
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 20,
    },
  },
  listItem: {
    color: '#FFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: '18px',
    margin: 'auto'
  },
  smallHeading: {
    fontFamily: `Evogria, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  desc: {
    fontFamily: `Evogria, ${theme.fontFamily}`,
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  control: {
		paddingLeft: 50,
		paddingRight: 50,
		fontFamily: `Outfit, ${theme.fontFamily}`,
		fontSize: '1.125rem',
		fontWeight: 600,
		transition: 'color .25s,border-color .25s,background-color .25s',
		justifyContent: 'center',
		alignItems: 'center',
	
		[theme.fn.smallerThan('md')]: {
		  width: '100%',
		},
  },
  card: {
    backgroundColor: 'rgb(15,15,15)',
    color: '#FFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    border: '1px solid rgba(202,204,255,.1)',
  },
  WhyDesc: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.8,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
}));

const HeadlightRestoration = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>The Best Headlight Restoration In Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='The Best Headlight Restoration In Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content={`If you're seeking headlight restoration services in Marietta, GA, look no further than Supreme Detail Studio. Our top-notch equipment and professional detailers guarantee the highest quality restoration for your headlights.`} />
      <meta name='keywords' content='louisville ky paint correction, louisville mobile car detailing, louisville undercarriage detailing, louisville headlight restoration, louisville mobile car wash, louisville ceramic coating, louisville paint correction, louisville mobile detail' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta name='og:title' content='The Best Headlight Restoration In Marietta, GA | Supreme Detail Studio' />
      <meta name='og:description' content={`If you're seeking headlight restoration services in Marietta, GA, look no further than Supreme Detail Studio. Our top-notch equipment and professional detailers guarantee the highest quality restoration for your headlights.`} />

    </Helmet>
    <HeadlightRestorationHero />
    <VideoIntroduction
          titleProp='Restore the appearance of your headlights without purchasing replacements.'
          descriptionProp={`Sometimes your headlights need a little TLC. Supreme Detail Studio can restore your headlights back to new condition. Our process includes a 4 step headlight restoration process, wet sanding, compounding, polishing and protecting with a 3 year ceramic coating.`}
          videoProp='d'
          buttonText='Book Appointment'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=e6UmZy4E6B2KYgCP6Mah&sku=irC3RkUFCvxiMjoUw9ZA'
          />
    <ImportanceHeadlights />
    <TrustedBrands />
    <div className={classes.bgBody}>
    <Container size="xl">
    {/* <ExteriorTable /> */}

      <div className={classes.wrapper}>
        <Title className={classes.h1}>What Is Headlight Restoration?</Title>
        <div>
        <p className={classes.WhyDesc}>Headlight restoration is the process of restoring the clarity and brightness of your car's headlights. Over time, headlights can become foggy, yellowed, and scratched, making them less effective at night and in poor weather conditions. Our headlight restoration service in Marietta, GA can remove these imperfections and restore your headlights to their original condition.</p>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-6">

          <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=e6UmZy4E6B2KYgCP6Mah&sku=irC3RkUFCvxiMjoUw9ZA" target="_blank"  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
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
    </Container>
    </div>
    <WhyUsHeadlights />
    <Map />
    </>
  )
}

export default HeadlightRestoration;
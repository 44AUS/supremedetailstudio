import React from 'react';
import { Container, Title, createStyles } from '@mantine/core';
import PaintCorrectionHero from '../components/Heroes/PaintCorrectionHero';
import WhatIsPaintCorrection from '../components/BenefitsAndImportance/WhatIsPaintCorrection';
import PaintCorrectionComponent from '../components/PaintCorrection/PaintCorrection';
import { Helmet } from 'react-helmet';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import TrustedBrands from '../components/BenefitsAndImportance/TrustedBrands';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 0,
    position: 'relative',
  },
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  h1: {
    marginTop: '15px',
    marginBottom: '15px',
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
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  desc: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
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

  section: {
    borderBottom: `1px solid rgba(202,204,255,.1)`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    fontFamily: `Outfit, ${theme.fontFamily}`,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const PaintCorrection = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Paint Correction Services In Louisville, KY | Supreme Detail Studio</title>
      <meta name='title' content='Paint Correction Services In Louisville, KY | Supreme Detail Studio' />
      <meta name='description' content='Remove scratches and swirl marks in Louisville, KY with our paint correction services' />
      <meta name='keywords' content='louisville ky paint correction, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville ceramic coating, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta name='og:title' content='Paint Correction Services In Louisville, KY | Supreme Detail Studio' />
      <meta name='og:description' content='Remove scratches and swirl marks in Louisville, KY with our paint correction services' />
    </Helmet>
    <PaintCorrectionHero />
    <VideoIntroduction
          titleProp={`DON'T LET YOUR CAR'S PAINT SUFFER ANY LONGER`}
          descriptionProp={`If you want to take your car from a good grade of paint, all the way up to completely defect and swirl free in direct sunlight with extreme smoothness then this process is for you. Paint Correction utilizes nanotechnology refinishing tools that will remove any defects or swirl marks leaving you the brilliant shine you have always been looking for. Paint Correction is required in preparation for application of Ceramic Coating.`}
          videoProp='dpqVKHSZFYs'
          buttonText='View Our Packages'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/joHM8Dxh2Y2E9HsOXeF2'
          />
    <WhatIsPaintCorrection />
    <TrustedBrands />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1} mt="md">OUR PAINT CORRECTION PACKAGES</Title>
        <PaintCorrectionComponent />
      </div>
    </Container>
    </div>
    {/* <TellUs /> */}
    </>
  )
}

export default PaintCorrection;
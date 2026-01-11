import React from 'react';
import { Container, Title, Text, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import BenefitsOfWPF from '../components/BenefitsAndImportance/BenefitsOfWPF';
import WindshieldProtectionFilmHero from '../components/Heroes/WindshieldProtectionFilmHero';
import VideoIntroduction from '../components/BenefitsAndImportance/VideoIntroduction';
import CertifiedWindshieldComponent from '../components/BenefitsAndImportance/WindshieldCertifiedInstaller';

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

const WindshieldProtectionFilmPage = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Windshield Protection Film Installer In Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Windshield Protection Film Installer In Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Marietta, GA Windshield Protection Film Installer' />
      <meta name='keywords' content='louisville ky windshield protection film, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Windshield Protection Film, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <WindshieldProtectionFilmHero />
    <VideoIntroduction
          titleProp='ClearPlex Windshield Protection Film Installation'
          descriptionProp={`At Supreme Detail Studio we understand the frustration of dealing with rock chips and damage to your windshield caused by everyday driving. That’s why we proudly offer ClearPlex®, a 4-Mil windshield protection film manufactured by Madico®, to keep your windshield safe and sound. With ClearPlex®, you can enjoy a crystal-clear view while shielding your windshield from sandblasting and rock chips, whether you’re driving on the street or hitting the race track.`}
          videoProp='8o3LertVGHM'
          buttonText='Book Appointment'
          buttonLink='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv'
          />
    <BenefitsOfWPF />
    <CertifiedWindshieldComponent />
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>WINDSHIELD PROTECTION FILM</Title>
        <div>
          <Text className={classes.desc}>
            
          </Text>
        </div>
      </div>
    {/* <CeramicFAQ /> */}
    </Container>
    </div>
    {/* <TellUs /> */}
    </>
  )
}

export default WindshieldProtectionFilmPage;
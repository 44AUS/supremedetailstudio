import React from 'react';
import { Container, Card, Title, Text, Group, Badge, Image, Button, Center, SimpleGrid, createStyles, getStylesRef, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import FullDetail from '../components/FullDetail/FullDetail';
import FullDetailHero from '../components/Heroes/FullDetailHero';
import { Helmet } from 'react-helmet';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '1rem',
    paddingBottom: 0,
    position: 'relative',
  },
  h1: {
    marginTop: '15px',
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

}));

const FullDetailing = () => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Helmet>
      <title>Automotive Detailing Louisville, KY | Supreme Detail Studio</title>
      <meta name='title' content='Automotive Detailing Louisville, KY | Supreme Detail Studio' />
      <meta name='description' content='Supreme Detail Studio is an interior and exterior vehicle care team that will help improve your vehicle! Call us today at (502) 417-0690 to get started' />
      <meta name='keywords' content='car detail louisville ky, louisville ky paint correction, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville ceramic coating, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/images/detailing.jpg' />

      <meta property="og:title" content='Automotive Detailing Louisville, KY | Supreme Detail Studio' />
      <meta property="og:description" content='Supreme Detail Studio is an interior and exterior vehicle care team that will help improve your vehicle! Call us today at (502) 417-0690 to get started' />
      <meta property="og:image" content='%PUBLIC_URL%/images/detailing.jpg' />

    </Helmet>

    <FullDetailHero />
    <Container size="xl">

      <div className={classes.wrapper}>
        <Title className={classes.h1} mt="md" mb="md">OUR FULL DETAILING PACKAGES</Title>
        <FullDetail />
      </div>
    </Container>
    </>
  )
}

export default FullDetailing;
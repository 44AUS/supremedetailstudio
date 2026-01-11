import React, { useState } from 'react'
import { Container, Title, SimpleGrid, Text, Button, AspectRatio, createStyles } from '@mantine/core';
import BeforeAndAfterHero from '../components/Heroes/BeforeAndAfterHero';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import WheelBefore from '../assets/images/before-after/wheel-before.webp';
import WheelAfter from '../assets/images/before-after/wheel-after.webp';
import FloorMatBefore from '../assets/images/before-after/floor-mat-before.webp';
import FloorMatAfter from '../assets/images/before-after/floor-mat-after.webp';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    position: 'relative',
  },
  beforeAndAfterWrapper: {
    height: '550px',
    width: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '4rem',
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
    },
  },
  h1: {
    marginTop: 0,
    marginBottom: '1.25rem',
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '28px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 22,
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
    fontFamily: `Evogria, ${theme.fontFamily}`,
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  WhyDesc: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  bgBody: {
    backgroundColor: '#000',
    // backgroundImage: 'linear-gradient(45deg, #000, #2e2e2e)',
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
}));

const BeforeAndAfterPage = () => {
  const { classes } = useStyles();

  return (
    <>
    <BeforeAndAfterHero />
    <div className={classes.bgBody}>
    <Container size="xl">
    <div className={classes.wrapper}>

    <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: '62rem', cols: 2, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}>

    <div>
    <AspectRatio ratio={550 / 600}>
    <div className={classes.beforeAndAfterWrapper}>
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={WheelBefore} srcSet={WheelBefore} alt="Wheel Before" />}
      itemTwo={<ReactCompareSliderImage src={WheelAfter} srcSet={WheelAfter} alt="Wheel After" />}
    />
    </div>
    </AspectRatio>
    <Title className={classes.h1}>WHEEL AND TIRE CLEANING</Title>
    </div>

    <div>
    <AspectRatio ratio={550 / 600}>
    <div className={classes.beforeAndAfterWrapper}>
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={FloorMatBefore} srcSet={FloorMatBefore} alt="Floor Mat Before" />}
      itemTwo={<ReactCompareSliderImage src={FloorMatAfter} srcSet={FloorMatAfter} alt="Floor Mat After" />}
    />
    </div>
    </AspectRatio>
    <Title className={classes.h1}>FLOOR MAT CLEANING</Title>
    </div>

    </SimpleGrid>

    </div>
      </Container>
    </div>
    </>
  )
}

export default BeforeAndAfterPage;
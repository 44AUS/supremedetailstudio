import React from 'react';
import { Title, SimpleGrid, Image, Tabs, Container, createStyles } from '@mantine/core';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
// import NoTint from '../../assets/images/tint/Audi-NoTint.png';
// import ThirtyFive from '../../assets/images/tint/Audi-35.png';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#000',
    paddingTop: '69px',
    paddingBottom: '69px',
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
    marginBottom:'15px',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
	  },
  },
}));

const TintComparison = () => {
  const { classes, theme } = useStyles();

  return (
    <div className={classes.bgBody}>
    <Container size="xl">
    <div className={classes.wrapper}>
    <Title className={classes.h1}>WHICH TINT PERCENTAGE IS RIGHT FOR YOU?</Title>
    <img src='https://ceramicpro.com/wp-content/uploads/2020/07/Window-Tint-Chart.png' />
    </div>
    </Container>
  </div>
  )
}

export default TintComparison;
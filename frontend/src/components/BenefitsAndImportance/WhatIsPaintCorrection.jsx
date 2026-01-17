import React from 'react'
import { SimpleGrid } from '@mantine/core';
import { Container, Title, createStyles } from '@mantine/core';

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
}));
const WhatIsPaintCorrection = () => {
    const { classes } = useStyles();

  return (
    <>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>What Is Paint Correction?</Title>
        <div className={classes.desc}>
          The Difference Is Clear
        </div>
    <SimpleGrid
      cols={4}
      spacing="xl"
      breakpoints={[
        { maxWidth: '62rem', cols: 4, spacing: 'md' },
        { maxWidth: '48rem', cols: 1, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
    >
      <div>
      <div className={classes.benefitIcon}><div>1</div></div>
        <h1 className={classes.h1Why}>What Is The Benefit of Paint Correction?</h1>
        <p className={classes.WhyDesc}>The maintenance of your vehicle will determine its value. That is why it's important to invest in paint correction and upkeep.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>2</div></div>
        <h1 className={classes.h1Why}>Can I Put Ceramic Coating On After Paint Correction?</h1>
        <p className={classes.WhyDesc}>We recommend your vehicle's paintwork has been corrected prior to adding a ceramic coating.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>3</div></div>
        <h1 className={classes.h1Why}>My Paint Is Oxidized, Will Paint Correction Fix This?</h1>
        <p className={classes.WhyDesc}>Depending on the severity of the oxidation, our paint correction can eliminate all but the most extreme cases.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>4</div></div>
      <h1 className={classes.h1Why}>DO NEW CARS NEED PAINT PROTECTION?</h1>
        <p className={classes.WhyDesc}>Yes! Due to improper care, there may be flaws in your clear coat from the factory.</p>
      </div>
      </SimpleGrid>
    </div>
    </Container>
    </div>
    </>
  )
}

export default WhatIsPaintCorrection;
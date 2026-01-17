import React from 'react'
import { SimpleGrid } from '@mantine/core';
import { Container, Card, Title, Text, Group, Center, createStyles, getStylesRef, rem } from '@mantine/core';
import { Link } from 'react-router-dom';

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
    fontFamily: 'SceneProRg',
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
const WhyUsHeadlights = () => {
    const { classes } = useStyles();

  return (
    <>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>Why Choose Us</Title>
        <div className={classes.desc}>
          Why you should choose Supreme Detail Studio for your headlight restoration needs
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
        <h1 className={classes.h1Why}>Our Equipment</h1>
        <p className={classes.WhyDesc}>We use state-of-the-art headlight restoration equipment to ensure that your headlights are restored to the highest standards.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>2</div></div>
        <h1 className={classes.h1Why}>Professional Detailers</h1>
        <p className={classes.WhyDesc}>Our professional detailers are certified in headlight restoration. They know how to properly restore your headlights without damaging them.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>3</div></div>
        <h1 className={classes.h1Why}>Competitive Prices</h1>
        <p className={classes.WhyDesc}>We offer competitive prices for our headlight restoration services. We also offer a variety of packages to fit your needs and budget.</p>
      </div>
      </SimpleGrid>
    </div>
    </Container>
    </div>
    </>
  )
}

export default WhyUsHeadlights;
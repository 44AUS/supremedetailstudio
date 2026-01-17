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
const BenefitsOfResidentialTint = () => {
    const { classes } = useStyles();

  return (
    <>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>RESIDENTIAL WINDOW TINTING OPTIONS BENEFIT YOUR HOME</Title>
        <div className={classes.desc}>
          EXPERIENCE COMFORT IN YOUR HOME
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
        <h1 className={classes.h1Why}>SOLAR</h1>
        <p className={classes.WhyDesc}>The same way window tinting prevents solar energy from building up inside your vehicle is how it works preventing it from building up inside your home. We have a selection of solar-specific window tint film for residential properties in and around the Marietta area to resist infrared heat given off by the sun. These are great for the areas of your home that are facing the sun during the hottest points of the day.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>2</div></div>
        <h1 className={classes.h1Why}>SECURITY AND SAFETY</h1>
        <p className={classes.WhyDesc}>Your home is your sanctuary from the outside world. To bring you and your family the peace of mind that neither neighbors nor passersby can peek in without your permission, window tinting from Supreme Detail Studio has the answer! Our security and safety options that we supply are discreet enough to keep anyone from looking into your home while having a Visible Light Transmission (VLT) level that permits natural light to enter safely.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>3</div></div>
        <h1 className={classes.h1Why}>PRIVACY</h1>
        <p className={classes.WhyDesc}>We do offer window tinting that comes as an option for the more inconspicuous area in your house, such as a bathroom, pantry, or door. These give you as a homeowner comfort in knowing that those room interiors you need kept from the outside world will be kept private.</p>
      </div>
      <div>
      <div className={classes.benefitIcon}><div>4</div></div>
        <h1 className={classes.h1Why}>REFLECTIVE</h1>
        <p className={classes.WhyDesc}>Curb appeal is a must in home ownership. How does your home look from the outside, especially to any prospective buyers, if the time has come to put it on the market? Our reflective window tinting packages here at Supreme Detail Studio make a tremendous difference in both your home’s comfort and contemporary curb appeal.</p>
      </div>
      </SimpleGrid>
    </div>
    </Container>
    </div>
    </>
  )
}

export default BenefitsOfResidentialTint;
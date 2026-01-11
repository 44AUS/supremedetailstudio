import React from 'react'
import { SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Container, Title, Accordion, Button, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
    // backgroundImage: 'linear-gradient(45deg, #000, #2e2e2e)',
  },
  wrapper: {
    paddingTop: '132px',
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
    fontFamily: 'SceneProUltBlkIt',
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
    fontFamily: `SceneProRg`, 
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
  item: {
		backgroundColor: '#000',
		color: '#FFF',
		borderRadius: '0px',
		border: '1px solid rgba(202,204,255,.1)',
		overflow: 'hidden',
    '&[data-active]': {
      backgroundColor: 'transparent',
      borderColor: 'rgba(202,204,255,.1)',
    },
	},
}));
const StagesOfPPF = () => {
    const { classes } = useStyles();

  return (
    <>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>THE PAINT PROTECTION FILM PROCESS</Title>
        <div className={classes.desc}>
          Let The Professionals Handle It
        </div>
        <Accordion
      chevronPosition="right"
      defaultValue="none"
      chevronSize={50}
      variant="separated"
      >
        <Accordion.Item className={classes.item} value="how-long">
        
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
             1. Initiating the detailing process to start
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`, 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              At Supreme Detail Studio, we take the first step in the paint protection film application process quite seriously. Detailing must be done, and we do so in an exhaustive way to clean your vehicle’s exterior of the long-lasting grime that it has faced over the years. Utilizing a meticulous two-bucket hand wash technique and decontamination to follow, this phase guarantees that the PPF package you select adheres seamlessly to your vehicle's exterior and culminates a flawless, transparent, and immaculate appearance.
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="scratches">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              2. Tailoring your film to your vehicle with precision
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Our skilled PPF team at Supreme Detail Studio conducts a comprehensive inspection of your vehicle's paintwork following detailing to address paint defects. We also want to familiarize ourselves with your vehicle’s intricate nature, so we measure each surface. This diligence allows us to tailor your package to your vehicle with precise measurements and a cutting phase that allows us to wrap edges seamlessly. We employ only advanced measuring instruments and sophisticated cutting techniques to perform this stage.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="process">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
            3. Applying the paint protection film
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            After the PPF has been meticulously cut and adequately aligned with each body panel that is covered by your selected package, we can now begin the application process. We carefully position each segment of your PPF by hand and align it before adhering it to your vehicle. Our team is committed to achieving flawless placement without any room for error, so our adjustments are done patiently and fine-tuned before proceeding to the final stages of adherence, smoothing, and edge wrapping.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="wash">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              4. Finalizing with precision
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            The concluding phase in the PPF installation process at Supreme Detail Studio involves detailed attention to the edges of each panel being covered with your package. Our team skillfully wraps these edges, guaranteeing a sleek and indistinguishable integration with your finish that does not look like a film has been applied whatsoever. We then conduct a thorough inspection, smoothing out any residual imperfections that may naturally occur during adhesion and ensure the film is seamless all around. The end result is a vehicle that boasts a spotless, lustrous appearance that is fortified with a durable, self-healing protective top layer!
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
   </div>
    </Container>
    </div>
    </>
  )
}

export default StagesOfPPF;
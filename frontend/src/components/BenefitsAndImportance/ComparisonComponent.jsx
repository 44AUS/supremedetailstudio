import React from 'react';
import { Title, Image, Tabs, Container, createStyles } from '@mantine/core';
import CeramicVsPPF from './CeramicVsPPF';

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
  introductionTitle: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '30px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
	  },
  },
  whatIsIt: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    letterSpacing: '.3px',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    [theme.fn.smallerThan('lg')]: {
      textAlign: 'center',
    },
  },
}));

const ComparisonComponent = () => {
  const { classes, theme } = useStyles();

  return (
    <div className={classes.bgBody}>
    <Container size="xl">
    <div className='comparison-layout'>
      <div>
      <Title className={classes.introductionTitle}>PAINT PROTECTION FILM VS CERAMIC COATING</Title>
      <p className={classes.whatIsIt}>In a market saturated with nano ceramic coating installers, it has become difficult for consumers to find the “right” installation facility for their vehicle. Despite the wild claims of some manufacturers and installers, here is a diagram to clear up the difference.</p>
      <div className="cc-diagram-key-panel">
        <div className="cc-diagram-line"></div>
        <div>Ceramic Coating</div>
      </div>
      <div className="cc-diagram-key-panel">
        <div className="cc-diagram-line red"></div>
        <div>Paint Protection Film</div>
      </div>
  </div>
  <div>
  <CeramicVsPPF />
  </div>
  </div>
  </Container>
  </div>
  )
}

export default ComparisonComponent;
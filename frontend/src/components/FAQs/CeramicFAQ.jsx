import React from 'react';
import { Container, Title, SimpleGrid, Accordion, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '132px',
    paddingBottom: '4rem',
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
	control: {
		fontSize: theme.fontSizes.lg,
		padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
		color: theme.black,
		'&:hover': {
		  backgroundColor: 'transparent',
    },
	},
	content: {
		paddingLeft: theme.spacing.xl,
		lineHeight: 1.6,
		color: theme.black,
	},
	icon: {
		marginLeft: theme.spacing.md,
  },
	gradient: {
    backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
		  theme.colors[theme.primaryColor][5]
		} 100%)`,
	},
  bgShape: {
    zIndex: -1,
    width: '100%',
    position: 'absolute',
    top: '0%',
    bottom: 'auto',
    left: '0%',
    right: '0%',
    animation: 'fadein 1s',
  },
}));

const CeramicFAQ = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
    <Title className={classes.h1}>YOU HAVE QUESTIONS? WE HAVE ANSWERS</Title>
        <div className={classes.desc}>
          Here’s a list of common questions about our ceramic coatings.
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
              How long do ceramic coatings last on a car?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`, 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              With proper care, our ceramic coatings can last several years, offering enduring protection and shine.
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
              Do ceramic coatings protect against scratches?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            While it provides a protective layer, it's not scratch-proof. However, it can reduce the risk of minor scratches.
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
              How long does the ceramic coating process take?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            The process can take anywhere from 1-4 days, depending on the vehicle's condition and specific services chosen.
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
              Do I still need to wash my car after ceramic coating?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes, but the cleaning process is more straightforward, and the frequency may reduce due to its hydrophobic properties.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="need-ceramic">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How do I know if I need a ceramic coating?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            When it comes to any type of coatings, whether it be, waxes, sealants, or ceramic coats, it’s all personal preference. Coatings are a layer of protection on your paint, and ceramic coating is the most complex and durable type of protection. 
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion>
      </div>
      </>
  )
}

export default CeramicFAQ
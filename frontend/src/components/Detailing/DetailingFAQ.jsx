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

const DetailingFAQ = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
    <Title className={classes.h1}>YOU HAVE QUESTIONS? WE HAVE ANSWERS</Title>
        <div className={classes.desc}>
          Here’s a list of common questions about our auto detailing.
        </div>
        <Accordion
      chevronPosition="right"
      defaultValue="none"
      chevronSize={50}
      variant="separated"
      >
        <Accordion.Item className={classes.item} value="how-often">
        
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How often should I get my car detailed?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`, 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              For best results, we recommend detailing every 3-6 months, depending on vehicle usage and exposure to environmental factors.
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="how-long">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How long does the detailing process take?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Typically, a full auto detailing service can take anywhere between 5 to 10 hours, depending on the vehicle's condition and chosen services.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="products">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              What products do you use for detailing?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            We trust and use premium brands like Meguiar's and P&S Products to guarantee top-notch results.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="combine">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Can I combine detailing with other services, like ozone odor treatment?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes, you can. In fact, detailing before a ozone odor treatment ensures optimal results.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="appointment">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Do I need an appointment?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes! All services require an appointment. This is only so we can allocate the appropriate time and so we can provide you the highest quality service.
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion>
      </div>
      </>
  )
}

export default DetailingFAQ;
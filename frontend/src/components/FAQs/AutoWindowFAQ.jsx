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

const AutoWindowFAQ = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
    <Title className={classes.h1}>YOU HAVE QUESTIONS? WE HAVE ANSWERS</Title>
        <div className={classes.desc}>
          Here’s a list of common questions about our auto window tint.
        </div>
        <Accordion
      chevronPosition="right"
      defaultValue="none"
      chevronSize={50}
      variant="separated"
      >
        <Accordion.Item className={classes.item} value="diy">
        
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Is window tint installation a DIY project, or should I have it done professionally?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`, 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              Professional installation is highly recommended to ensure a precise, bubble-free, and long-lasting application. DIY projects often result in suboptimal performance and longevity.
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="clean-tint">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How can I maintain and clean my window tint without damaging it?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            To maintain and clean your window tint effectively, use a gentle, ammonia-free window cleaner and a soft, non-abrasive cloth or microfiber towel. Avoid using abrasive materials, such as paper towels or harsh cleaning agents, as they can scratch the tint or cause damage.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="damaged">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Can I have the window tint removed if I change my mind or if it becomes damaged?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes, window tint can be removed if necessary. However, the process can be intricate, and it’s often best performed by professionals to avoid damaging the glass. In the case of damaged or deteriorating tint, removal and replacement may be the best solution.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="rolled-up">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How long should I keep my windows rolled up after I have window tint installed?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            If windows are rolled down too soon after the installation, the window tint can peel off.  To avoid this, in Kentucky we recommend keeping your windows up for at least 3-4 days.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="travel">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Will you travel to my home to tint my vehicle?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            We can depending on the installation, vehicle, and the area. We travel to many areas in the Kentucky area and serve a wide variety of vehicle manufactures.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="cost-effective">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: `SceneProRg`, 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Are there any cost-effective window tint options available that still offer quality performance?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes, there are cost-effective window tint options, such as Pro Classic. While it may not offer the advanced features of ceramic tints, it provides essential benefits like UV protection, glare reduction, and enhanced privacy. It’s a reliable choice for those looking for budget-friendly window tint without compromising quality.
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion>
      </div>
      </>
  )
}

export default AutoWindowFAQ;
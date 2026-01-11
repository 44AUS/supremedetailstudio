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

const ResidentialTintFAQ = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
    <Title className={classes.h1}>YOU HAVE QUESTIONS? WE HAVE ANSWERS</Title>
        <div className={classes.desc}>
          Here’s a list of common questions about our residential window film.
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
              Can window film offer privacy and prevent people from seeing inside my home?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`, 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              Yes, depending on the type of window tint selected, the general home construction, and the application desired we can create the perfect solution for any homeowner.
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
              Will window film obstruct my view?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            No. Today’s high-quality window films reduce the sun’s glare and will have a sharper view through your windows.
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
              Will films change the appearance of my windows or cause excessive reflections?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Window tint can change the appearance of your home, but we also offer some films which are virtually undetectable and most people will not notice any changes to your home. Additionally, we offer some films that are less reflective than ordinary window glass.
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
              Do energy costs decrease if my windows are tinted?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes. A homeowner can save up to 50% in some cases. The amount of savings will depend on the type of window tint and the general construction of your home. Climate, sun exposure, existing energy costs, and the efficiency of air conditioning and heating systems are also factors to be considered regarding energy savings.
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
              Will window film reduce the fading of my belongings and furnishings?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes. Fading is caused by sunlight produced heat, UV rays, and visible light. All of which are can be controlled by the right choice in window film. While no window tint will completely stop fading, our window films can reduce the damage by up to 80%, which extends the lifetime and appearance of your possessions, furniture, and saves on high replacement costs.
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
              Is the film applied to the inside or the outside of the windows?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: `SceneProRg`,
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Window films are applied to the interior side of your windows.
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion>
      </div>
      </>
  )
}

export default ResidentialTintFAQ;
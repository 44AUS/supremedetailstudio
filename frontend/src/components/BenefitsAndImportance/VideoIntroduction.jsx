import React, { useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Select, TextInput, Textarea, Title, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import IntroGalleryWrapper from './IntroGalleryWrapper';


const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#000',
  },
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    marginBottom: '93px',
  },
  h1: {
    marginTop: 0,
    fontFamily: `Outfit, ${theme.fontFamily}`,
    textAlign: 'center',
    color: '#fff',
    fontSize: '3.13rem',
    lineHeight: 1.2,
    fontWeight: 800,
    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'center',
	  },
  },
  title: {
    marginTop: 0,
    marginBottom: '.5rem',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    textAlign: 'center',
    color: '#fff',
    fontSize: '2.13rem',
    lineHeight: 1.2,
    fontWeight: 800,
    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'center',
	  },
  },
  desc: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  p: {
    fontFamily: `SceneProRg`,
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    marginBottom: '1.25rem',
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
  control: {
    fontFamily: `SceneProRg`,
    fontWeight: 400,
    fontSize: '1rem',
    transition: 'color .25s,border-color .25s,background-color .25s',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      marginBottom: '70px'
    },
  },
  list: {
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 20,
    },
  },
  listItem: {
    fontFamily: `SceneProRg`,
    display: 'flex',
    padding: '1.5rem 2rem',
    alignItems: 'center',
    gridColumnGap: '0.75rem',
    border: '1px solid rgba(156,175,223,.11)',
    borderRadius: '10.375rem',
    backgroundImage: 'linear-gradient(180deg,rgba(50,60,131,.16),rgba(50,60,131,.16))',
    fontSize: '1.25rem',
    lineHeight: 1,
    color: '#FFF',
    margin: 'auto'
  },
  detailWrap: {
    display: 'flex',
    margin: '3.75rem auto 5rem',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumnGap: '1rem',
    gridRowGap: '1rem',
    [theme.fn.smallerThan('sm')]: {
      marginTop: '2rem',
      marginBottom: '3rem',
      gridColumnGap: '0.7rem',
      gridRowGap: '0.7rem'
    },
  },
  whyUs: {
    display: 'flex',
    padding: '2rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gridRowGap: '1.25rem',
    border: '1px solid rgba(202,204,255,.1)',
    borderRadius: '0px',
    backgroundColor: 'rgb(15,15,15)',
  },
  whyDetailInner: {
    fontFamily: `SceneProRg`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumnGap: '0.75rem',
    fontSize: '1.25rem',
    lineHeight: 1,
    [theme.fn.smallerThan('sm')]: {
      gridColumnGap: '0.5rem',
      fontSize: '16px',
    },
  },
  video: {
    borderRadius: '0px',
    width: '800px',
    height: '480px',
    // border: '4px solid #0f0f0f',
    // boxShadow: '0 15px 50px 0 rgb(23 25 47)',
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
      height: '260px',
    },
  },
  form: {
    maxWidth: '440px',
    marginBottom: 0,
    padding: '2rem',
    borderRadius: '0px',
    backgroundColor: 'rgb(15,15,15)',
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
    marginBottom: '70px',
    animation: 'fadein 1s',
    [theme.fn.smallerThan('lg')]: {
      textAlign: 'center',
    },
  },
}));

const VideoIntroduction = (props) => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
      <div className='video-hero-layout'>

          <div>
            <Title className={classes.introductionTitle}>{props.titleProp}</Title>
            <p className={classes.whatIsIt}>{props.descriptionProp}</p>

            <Link to={props.buttonLink} target="_blank"  style={{ textDecoration: 'none', display: 'flex' }}>
          <Button 
          radius="none" size="md" variant="shadow" className={classes.control} style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            {props.buttonText}
          </Button>

          </Link>

            </div>

            <div>
            <iframe 
            className={classes.video} 
            src={`https://www.youtube.com/embed/${props.videoProp}`}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>
          </div>

          </div>
      </div>
      {/* <IntroGalleryWrapper /> */}
      </Container>
      </div>
    </>
  )
}

export default VideoIntroduction;
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#000',
    padding: '80px 0',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoColumnLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    width: '100%',
    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  videoColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    letterSpacing: '.3px',
    marginTop: '1.25rem',
    marginBottom: '40px',
    animation: 'fadein 1s',
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
    },
  },
  video: {
    borderRadius: '8px',
    width: '100%',
    maxWidth: '560px',
    height: '315px',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
      height: '280px',
    },
    [theme.fn.smallerThan('sm')]: {
      height: '220px',
    },
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '18px 40px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(232, 2, 0, 0.6)',
    },
  },
}));

const VideoIntroduction = (props) => {
  const { classes } = useStyles();

  return (
    <div className={classes.bgBody}>
      <Container size="xl">
        <div className={classes.wrapper}>
          <div className={classes.twoColumnLayout}>
            {/* Video Column - Left */}
            <div className={classes.videoColumn}>
              <iframe 
                className={classes.video} 
                src={`https://www.youtube.com/embed/${props.videoProp}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Text Column - Right */}
            <div className={classes.textColumn}>
              <Title className={classes.introductionTitle}>{props.titleProp}</Title>
              <p className={classes.whatIsIt}>{props.descriptionProp}</p>
              <Link to={props.buttonLink} target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>
                {props.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VideoIntroduction;

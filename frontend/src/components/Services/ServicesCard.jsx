import React from 'react';
import { createStyles, Text, Card, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

const BORDER_RADIUS = 18;

const useStyles = createStyles((theme) => ({
  cardParent: {
    margin: '10px',
    position: 'relative',
  },

  card: {
    height: '440px',
    minHeight: '440px',
    padding: '15px',
    borderRadius: BORDER_RADIUS,
    position: 'relative',
    backgroundColor: '#000',
    border: '2px solid #494949',
    overflow: 'hidden',
    transition: 'transform 0.25s ease, border 0.25s ease',

    '&:hover': {
      transform: 'translateY(-4px)',
      border: '2px solid transparent',
      background:
        'linear-gradient(#000, #000) padding-box, linear-gradient(120deg, #e80200, #ff4d4d, #e80200) border-box',
      backgroundSize: '100% 100%, 300% 300%',
      animation: 'gradientMove 3s linear infinite',
    },

    [theme.fn.smallerThan('sm')]: {
      height: '280px',
      minHeight: '280px',
    },
  },

  /* 🔴 MOST POPULAR RIBBON (OUTSIDE CARD) */
  ribbon: {
    position: 'absolute',
    top: '12px',
    left: '-54px',
    width: '180px',
    height: '36px',
    background: 'linear-gradient(135deg, #e80200, #ff4d4d)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transform: 'rotate(-45deg)',
    zIndex: 10,
    boxShadow: '0 6px 18px rgba(232,2,0,0.45)',
    animation: 'ribbonPulse 2.2s ease-in-out infinite',
    pointerEvents: 'none',
  },

  image: {
    position: 'absolute',
    inset: 0,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: BORDER_RADIUS - 2,
    transition: 'transform 0.35s ease',

    '.mantine-Card-root:hover &': {
      transform: 'scale(1.06)',
    },
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: BORDER_RADIUS - 2,
  },

  content: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: '1px',
    fontSize: '18px',
  },

  '@global': {
    '@keyframes gradientMove': {
      '0%': { backgroundPosition: '0 0, 0% 50%' },
      '50%': { backgroundPosition: '0 0, 100% 50%' },
      '100%': { backgroundPosition: '0 0, 0% 50%' },
    },

    '@keyframes ribbonPulse': {
      '0%': { transform: 'rotate(-45deg) scale(1)' },
      '50%': { transform: 'rotate(-45deg) scale(1.06)' },
      '100%': { transform: 'rotate(-45deg) scale(1)' },
    },
  },
}));

const ServicesCard = (props) => {
  const { classes } = useStyles();

  return (
    <div className={classes.cardParent}>
      {/* RIBBON OUTSIDE CARD */}
      {props.mostPopular && (
        <div className={classes.ribbon}>Most Popular</div>
      )}

      <Link to={props.linkProp} style={{ textDecoration: 'none' }}>
        <Card className={classes.card}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${props.imageProp})` }}
          />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <Center maw={400} h={100}>
              <Text className={classes.title}>
                {props.titleProp}
              </Text>
            </Center>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default ServicesCard;

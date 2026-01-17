import React from 'react';
import { createStyles, Paper, Text, Title, Card, Group, Center, } from '@mantine/core';
import {CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { BorderRadius } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  cardParent: {
    margin: '10px',
  },
  card:{
    maxHeight: '440px',
    minHeight: '440px',
    height: '440px',
    borderStyle: 'none',
    borderRadius: '0px',
    border: '1px solid #494949',
    padding: '15px',
    [theme.fn.smallerThan('sm')]: {
      height: '100%'
    },
  },
  image: {
    display: 'block',
    backgroundPosition: 'center',
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
    ':hover' : {
      transform: 'scale(1.03)',
    }
  },
  title: {
    color: '#FFF',
    fontFamily: "'Montserrat', sans-serif",
    textTransform: 'uppercase',
    display: 'block',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    letterSpacing: '1px',
    fontSize: '18px',
    padding: '5px',
    [theme.fn.smallerThan('sm')]: {
      margin: 'auto'
    },
  },
  // description: {
  //   color: '#d3d3d3',
  //   fontFamily: 'SceneProRg',
  //   fontSize: '14px',

  //   // marginBottom: '10px',
  //   padding: '5px',
  //   paddingBottom: '40px',
  //   // marginTop: '10px',
  // },
  viewService: {
    color: '#FFF',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    marginTop: '23px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  panel: {
    width: '100%',
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, .35)',
    padding: '24px 17px 0',
  }
}));

const ServicesCard = (props) => {
  const { classes, theme } = useStyles();

  return (
    <>
    <div className={classes.cardParent}>
    <Link to={props.linkProp} style={{ textDecoration: 'none' }}>

    <Card
      className={classes.card}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            `url(${props.imageProp})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
        <Center maw={400} h={100}>
          <Text className={classes.title}>
            {props.titleProp}
          </Text>
          </Center>
        </div>
      </div>
    </Card>
    </Link>

    </div>
    </>
  )
}

export default ServicesCard;
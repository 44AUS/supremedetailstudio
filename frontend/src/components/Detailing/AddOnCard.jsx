import React from 'react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, SimpleGrid, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    textAlign: 'center',
    height: 'rem(440px)',
    display: 'flex',
    borderRadius: '0px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPsition: 'center',
    backgroundColor: 'transparent',
    color: '#FFF',
    fontFamily: `SceneProRg`,
    border: '1px solid #494949',
  },
  category: {
    color: '#FFF',
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'arial',
    fontWeight: 900,
    color: '#FFF',
    lineHeight: 1.2,
    fontSize: 'rem(32px)',
    marginTop: 10,
  },
  section: {
    borderBottom: '1px solid rgba(202,204,255,.1)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
}));

const AddOnCard = (props) => {
  const { classes, theme } = useStyles();

  return (
    <>
    <Link to={props.linkProp} target='_blank' style={{ textDecoration: 'none' }}>
    <Card p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
      <Text mt="xs" style={{ fontFamily: `Montserrat`, fontSize: '20px' }}>
          {props.titleProp}
        </Text>
        <Text mt="xs" style={{ fontFamily: `Montserrat`, fontSize: '15px', color: '#868686' }}>
          {props.descProp}
        </Text>
  
          <Text mt="xs" fw={500} style={{ fontFamily: `Montserrat`, fontSize: '19px' }}>
            Starts at {props.priceProp}
          </Text>

      </Card.Section>
    </Card>
    </Link>
    </>
  )
}

export default AddOnCard;
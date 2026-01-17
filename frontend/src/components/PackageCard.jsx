import React from 'react';
import { Card, Image, Text, Group, Badge, Center, Button, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: 0,
    position: 'relative',
  },
  h1: {
    marginTop: 0,
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    color: '#fff',
    fontSize: '3.13rem',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 28,
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
  list: {
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 20,
    },
  },
  listItem: {
    color: '#FFF',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '18px',
    margin: 'auto'
  },
  smallHeading: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#ababab',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
  },
  control: {
		paddingLeft: 50,
		paddingRight: 50,
		fontFamily: "'Montserrat', sans-serif",
		fontSize: '1.125rem',
		fontWeight: 600,
		transition: 'color .25s,border-color .25s,background-color .25s',
		justifyContent: 'center',
		alignItems: 'center',
	
		[theme.fn.smallerThan('md')]: {
		  width: '100%',
		},
  },
  card: {
    backgroundColor: '#0f0f0f',
    color: '#FFF',
    border: '1px solid #dfdfdf',
    borderRadius: '10px',
    animation: 'fadein 1s',
    height: 'fit-content',
    // position: 'absolute',
  },
  label: {
    marginBottom: '10px',
    lineHeight: 1,
    
  },
  section: {
    padding: 20, 
    borderTop: '1px solid #dfdfdf',
  },
  sectionButton: {
    borderTop: '1px solid #dfdfdf',
  },
  sectionList: {
    color: '#a1a1a1',
    borderTop: '1px solid #dfdfdf',
    padding: 35,
  },
  centerButton: {
    margin: '0 auto',
    width: '100%',
  },
  li: {
    fontFamily: "'Montserrat', sans-serif",
    display: 'list-item',
    backgroundColor: '#0f0f0f',
    [theme.fn.smallerThan('md')]: {
      color: 'rgb(161, 161, 161)',
      display: 'list-item',
      fontSize: '14px',
		},
    
  },
  list: {
    listStyleType: 'disc',
    lineHeight: '1.8',
    [theme.fn.smallerThan('md')]: {
      display: 'list-item',
      listStyleType: 'disc',
      lineHeight: '1.8',
		},
  }
}));

export default function PackageCard(props) {
  const { classes, theme } = useStyles();
  const mockdata = [
  'Two bucket hand wash', 
  'Tires, wheels, and wheel wells cleaned and dressed', 
  'Door and trunk jambs cleaned', 
  'Bug and tar removal', 
  'Paint is coated with high-quality wax', 
  'Streak-free exterior glass cleaning', 
  'CarFax record update'
]

  return (
    <Card className={classes.card}>
        <div>
          <Text fz="lg" fw={500} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center'  }}>{props.packageTitle}</Text>
        </div>
        <div>
          <Text fz="sm" c="dimmed" fw={500} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 400, color: '#a1a1a1', lineHeight: 1.8, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} mt={3}>
              {props.packageDuration}
            </Text>
          </div>

      <Card.Section className={classes.sectionList} mt="md">
          <>
          {props.included.map(function(data) {
      return (
        <div>
                <ul role='list' className={classes.list}>
        <li className={classes.li}>{data}</li>
      </ul>
        </div>
      )
    })}
          </>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
      <Text fz="sm" c="dimmed" fw={500} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '22px', fontWeight: 400, color: '#ffffff', lineHeight: 1, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} mt={3}>
              {props.price}
            </Text>
      </Card.Section>

      <Card.Section className={classes.sectionButton}>
          <Link to={props.bookingLink} target="_blank">
          <Button 
            radius="md" 
            styles={(theme) => ({
              root: {
                flex: 1,
                height: '100%',
                paddingTop: '17px',
                paddingBottom: '17px',
                backgroundColor: '#e80200',
                fontFamily: "'Montserrat', sans-serif",
                textTransform: 'uppercase',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '5px',
                lineHeight: '1',
                // paddingTop: '17px',
                // paddingBottom: '17px',
                width: '100%',
                borderRadius: '0px',
                transition: 'background-color .5s',
                '&:hover': {
                  backgroundColor: '#2fa2f7',
                },
              },
            })}
            >
            Book Appointment
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
}
import { createStyles, Header, Container, Title, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { ArrowDown, ArrowUp } from 'tabler-icons-react';
import BurgerMenu from './Burger';

const HEADER_HEIGHT = 75;

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    position: 'sticky',
    borderBottom: '0px solid',
    left: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    textTransform: 'uppercase',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    border: '0px solid',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
    lineHeight: 1.1,
    transition: '.25s',
    '&:hover': {
      opacity: .6,
    },
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: '#213547',
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
    '&:before':{
      content: "''",
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0,
      height: '2px',
      backgroundColor: `rgb(0, 255, 0)`,
      transition: 'width 0.25s ease-out',
    },
    '&:hover::before': {
      width: '100%'
    },
    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),
    '&:active': theme.activeStyles,
  },
  dropdown: {
    backgroundColor: '',
  },
  linkDropdown: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#FFF',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      padding: 10,
      borderRadius: '50px',
      backgroundColor: 'hsla(0, 0%, 100%, .07)',
      color: '#ebebeb'
    },
  },
  navlink: {
    fontFamily: `SceneProBold`,
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '1px',
    color: '#FFF',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '.2s',
    padding: '7.5px 10px',
    position: 'relative',
    '&:before': {
      content: '" "',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0,
      height: '2px',
      backgroundColor: '#FFF',
      transition: 'width 0.25s ease-out',
    },
    '&:hover:before': {
      width: '100%'
    },
  },
  linkActive: {
    fontFamily: `SceneProBold`,
    content: '" "',
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '1px',
    color: '#FFF',
    opacity: '0.8',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '.2s',
    padding: '7.5px 10px',
  },
  control: {
    fontFamily: `SceneProRg`,
    fontSize: '14px',
    fontWeight: 400,
    transition: 'color .25s,border-color .25s,background-color .25s',
  },
  down: {
    position: 'static',
    margin: 0,
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    transform: 'rotate(45deg)',
  },
}));

export default function HeaderMenu() {
  const [opened, { open, toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const [active, setActive] = useState(0);

  return (
    <Header className={classes.root}>
      <Container className={classes.header} size="xl">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Title className={classes.title}>
          <img className="logo" src="images/logo.png" alt='logo' />
        </Title>
      </Link>
      
      <Group spacing={5} className={classes.links}>
         {/* <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/paint-protection-film"
        >
          Paint Protection Film
        </NavLink> */}
        <ul>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/paint-protection-film"
        >
          Paint Protection Film ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/paint-protection-film">
              Our PPF Packages
            </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/windshield-protection-film">
              Windshield Protection Film
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/light-protection-film">
              Light Protection Film
            </NavLink>
            {/* <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/interior-protection-film">
              Interior Protection Film
            </NavLink> */}
            {/* <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/surface-protection-film">
              Surface Protection Film
            </NavLink> */}
            {/* <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/antimicrobial-film">
              Antimicrobial Film
            </NavLink> */}
          </li>
        </ul>
        </li>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/ceramic-coatings"
        >
          Ceramic Coatings ▾
        </NavLink>
        <ul className='dropdown'>
        <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/ceramic-coatings">
              Ceramic Coating Packages
            </NavLink>
          </li>
          {/* <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/glass-coatings">
              Glass Coatings
            </NavLink>
          </li> */}
        </ul>
        </li>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/window-tinting"
        >
          Window Tinting ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/automotive-tinting">
              Automotive Tinting
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/residential-tinting">
              Residential Tinting
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/commercial-tinting">
              Commercial Tinting
            </NavLink>
          </li>
        </ul>
        </li>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/detailing"
        >
          Auto Detailing ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/full-detail">
              Full Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/exterior-detail">
              Exterior Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/interior-detail">
              Interior Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/headlight-restoration">
              Headlight Restoration
            </NavLink>
          </li>
        </ul>
        </li>
        
        <li>
        <NavLink
        className={classes.navlink}
        to="#"
        >
          More ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/paint-correction">
              Paint Correction
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/additional-services">
              Additional Services
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/tiktok-live">
              Live Stream
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/before-and-after">
              Before and After
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/gallery">
              Gallery
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/reviews">
              Reviews
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/contact-us">
              Contact Us
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/faq">
              FAQs
            </NavLink>
          </li>
        </ul>
        </li>

        {/* <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/gallery"
        >
          Gallery
        </NavLink> */}
        {/* <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/reviews"
        >
          Reviews
        </NavLink>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        to="/faq"
        >
          FAQ
        </NavLink> */}
        </ul>
      </Group>
      
      <Group spacing={5} className={classes.links}>
        <Link to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw" target="_blank" style={{ textDecoration: 'none' }}>
          <Button 
          size="lg" 
          className={classes.control}
          styles={(theme) => ({
            root: {
              backgroundColor: 'rgba(0,0,0,0)',
              border: '1px solid #fff',
              borderRadius: '6px',
              fontFamily: `SceneProRg`,
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '3px',
              transition: 'background-color .5s, color .5s',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0)',
                color: '#fff',
              },
            },
            leftIcon: {
              marginRight: 15,
            },
          })}
          >
            Book Appointment
          </Button>
        </Link>
      </Group>

      <BurgerMenu />
      
      </Container>
    </Header>
  );
}
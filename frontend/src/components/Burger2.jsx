import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createStyles, Burger, Drawer, ScrollArea, Collapse, HoverCard, Center } from '@mantine/core';
import { Box, Group, Title, Text, UnstyledButton, ThemeIcon, MantineLogo, Anchor, SimpleGrid, Divider, Button } from '@mantine/core';
import {
  IconChevronDown,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottom: '0px solid',
    left: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px',
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
  navlink: {
    fontFamily: `SceneProBdIt`,
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#FFF',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '.2s',
    padding: '10px 15px',
    '&:hover': {
      opacity: '.8'
    },
  },
  linkActive: {
    fontFamily: `SceneProBdIt`,
    color: '#ebebeb',
    fontWeight: 700,
    letterSpacing: '1px',
    opacity: '.8',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '.2s',
    padding: '10px 15px',
  },
  control: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontWeight: 600,
    transition: 'color .25s,border-color .25s,background-color .25s',
  },
}));

const BurgerMenu2 = () => {
  const { classes } = useStyles();

  const [opened, { open, toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const closeDrawer = () => setDrawerOpened(false);
  const toggleLinks = () => setLinksOpened(!linksOpened);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [linksOpened, setLinksOpened] = useState(false);

  const toggleDrawer = () => setDrawerOpened(!drawerOpened);
  
  useEffect(() => {
    if (!open){
      document.getElementById("close-button").click()
    }
  },[open]);

  return (
    <>
    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
    <div class="menu-wrap">
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${'80px'})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Services
              </Box>
              <IconChevronDown style={{ width: '16px', height: '16px' }} color="blue" />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>;</Collapse>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/tesla-customers">
              Tesla Customers
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/about">
              About
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/reviews">
              Reviews
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} to="/contact-us">
              Contact
            </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button>Book Now</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </div>
    </>
  )
}

export default BurgerMenu2;
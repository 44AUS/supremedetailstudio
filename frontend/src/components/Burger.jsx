import { createStyles } from '@mantine/core';
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

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

const BurgerMenu = () => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    if (!open){
      document.getElementById("close-button").click()
    }
  },[open]);

  return (
    <div class="menu-wrap">
      <input type="checkbox" id="close-button" onClick={()=> setOpen(true)} class="toggler" />
      <div class="hamburger"><div></div></div>
      <div class="menu">
        <div>
          <div>
            <ul>
            <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        onClick={()=> setOpen(false)}
        to="/paint-protection-film"
        >
          Paint Protection Film ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/paint-protection-film">
              Our PPF Packages
            </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/windshield-protection-film">
              Windshield Protection Film
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/light-protection-film">
              Light Protection Film
            </NavLink>
            {/* <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/interior-protection-film">
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
        onClick={()=> setOpen(false)}
        to="/ceramic-coatings"
        >
          Ceramic Coatings ▾
        </NavLink>
        <ul className='dropdown'>
        <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/ceramic-coatings">
              Ceramic Coating Packages
            </NavLink>
          </li>
          {/* <li>
          <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/glass-coatings">
              Glass Coatings
            </NavLink>
          </li> */}
        </ul>
        </li>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        onClick={()=> setOpen(false)}
        to="/window-tinting"
        >
          Window Tinting ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/automotive-tinting">
              Automotive Tinting
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/residential-tinting">
              Residential Tinting
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/commercial-tinting">
              Commercial Tinting
            </NavLink>
          </li>
        </ul>
        </li>

        <li>
        <NavLink
        className={({ isActive }) =>
        isActive ? `${classes.linkActive}` : `${classes.navlink}`}
        onClick={()=> setOpen(false)}
        to="/detailing"
        >
          Auto Detailing ▾
        </NavLink>
        <ul className='dropdown'>
          <li>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/full-detail">
              Full Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/exterior-detail">
              Exterior Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/interior-detail">
              Interior Detail Packages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/headlight-restoration">
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
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/paint-correction">
              Paint Correction
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/additional-services">
              Additional Services
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/tiktok-live">
              Live Stream
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/before-and-after">
              Before and After
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/gallery">
              Gallery
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/reviews">
              Reviews
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/contact-us">
              Contact Us
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${classes.linkActive}` : `${classes.navlink}`} onClick={()=> setOpen(false)} to="/faq">
              FAQs
            </NavLink>
          </li>
        </ul>
        </li>

              <li><NavLink
              className={({ isActive }) =>
              isActive ? `${classes.linkActive}` : `${classes.navlink}`}
              onClick={()=> setOpen(false)}
              to="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw"
              target="_blank"
              >
                Book Now
              </NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;
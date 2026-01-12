import React from 'react';
import { createStyles, Container, Group, Title, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const useStyles = createStyles((theme) => ({
  title: {
    maxWidth: '214px',
    marginBottom: '56px',
    maxWidth: '100%',
    display: 'block',
    objectFit: 'contain',
    color: '#FFFFFF',
    fontFamily: "'Montserrat', sans-serif", 
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.1,
    transition: '.25s',
    '&:hover': {
      opacity: .6,
    },
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: '100%',
    },
  },
  footerText: {
    fontFamily: "'Montserrat', sans-serif", 
    color: '#FFF',
    fontSize: '14px',
    lineHeight: '180%',
    maxWidth: 300,
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'center',
      maxWidth: '100%',
    },
  },
  footer2: {
    fontFamily: "'Montserrat', sans-serif", 
    backgroundColor: '#000',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '69px',
    paddingBottom: '45px',
    display: 'flex',
  },
  footerLeftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    display: 'flex',
    [theme.fn.smallerThan('md')]: {
      alignItems: 'center',
    },
  },
  footerRightColumn: {
    gridColumnGap: '16px',
    gridRowGap: '16px',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridAutoColumns: '1fr',
    display: 'grid',
    [theme.fn.smallerThan('md')]: {
      gridRowGap: '24px',
      textAlign: 'center',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
  socialContainer: {
    gridColumnGap: '16px',
    gridRowGap: '16px',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto auto auto',
    gridAutoColumns: '1fr',
    display: 'grid',
  },
  footerPageColumn: {
    flexDirection: 'column',
    display: 'flex',
  },
  footerLabel: {
    fontFamily: "'Oswald', sans-serif",
    color: '#fff',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '13px',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 1,
  },
  footerContainer: {
    width: '85%',
    maxWidth: '1280px',
    gridColumnGap: '16px',
    gridRowGap: '16px',
    borderTop: '1px #303030',
    borderBottom: '1px #494949',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1.5fr',
    gridAutoColumns: '1fr',
    marginTop: 0,
    marginBottom: '21px',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'grid',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column-reverse',
      display: 'flex',
    },
  },
  footerContainer2: {
    width: '85%',
    maxWidth: '1280px',
    filter: 'none',
    borderTop: '1px solid #333',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '45px',
    display: 'flex',
    position: 'relative',
  },
  footerSocialLink: {
    maxWidth: '100%',
    display: 'inline-block',
  },
  footerPageLink: {
    color: 'gray',
    fontSize: '15px',
    marginBottom: '5px',
    textDecoration: 'none',
    display: 'block',
  },
  addressColumn: {
    minWidth: '240px',
  },
  businessInfo: {
    color: '#777',
  },
  contactDetailsText: {
    // color: '#fff',
    color: 'gray',
    fontSize: '14px',
    marginBottom: '12px',
    lineHeight: 1.6,
    textDecoration: 'none',
    display: 'block',
  },
  iconInverted: {
    filter: 'invert()',
  },
  flogo: {
    marginRight: '11px',
    '&:hover': {
      opacity: .6,
    },
  },
  credits: {
    color: '#fff',
    alignItems: 'center',
    textDecoration: 'none',
    display: 'flex',
    maxWidth: '100%',
  },
  footerBottomText: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
  },
  textSpan: {
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 600,
  },
}));

const Footer2 = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer2}>
      <div className={classes.footerContainer}>
        <div className={classes.footerLeftColumn}>
        <Link to="/" style={{ textDecoration: 'none' }}>
                <Title className={classes.title}>
                  <img src={Logo} className="logo" loading="lazy" alt="Supreme Detail Studio" width='214px' />
                </Title>
              </Link>
          <div className={classes.socialContainer}>
            <a href="https://www.facebook.com/supremedetailstudio" target="_blank" className={classes.footerSocialLink}>
              <img src="https://assets-global.website-files.com/62713babd7c7761ea531ece1/62713babd7c77685f331ed4a_FacebookIconWhite.svg" loading="lazy" width="20" alt="" class="footer-social-icon" />
            </a>
            <a href="https://www.instagram.com/supremedetailstudio/?hl=en" target="_blank" class="footer-social-link w-inline-block">
              <img src="https://assets-global.website-files.com/62713babd7c7761ea531ece1/62713babd7c77650b431ed49_InstaIcon.svg" loading="lazy" width="20" alt="" className={classes.iconInverted} />
            </a>
            <a href="https://maps.app.goo.gl/QFjgzaEzVkWFQyQw6" target="_blank" class="footer-social-link w-inline-block">
              <img src="https://assets-global.website-files.com/613f61814858fe0764bc22a2/61a791ed5e5d6b6bc70caf9e_GoogleIcon.svg" loading="lazy" width="20" alt="" className={classes.iconInverted} />
            </a>
          </div>
        </div>
        <div className={classes.footerRightColumn}>
        <div className={classes.footerPageColumn}>
          <div className={classes.footerLabel}>Pages</div>
          <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Home</div>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>About</div>
          </Link>
          <Link to="/gallery" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Gallery</div>
          </Link>
          <Link to="/reviews" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Reviews</div>
          </Link>
          <Link to="/contact-us" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Contact Us</div>
          </Link>
        </div>
        <div className={classes.footerPageColumn}>
          <div className={classes.footerLabel}>Services</div>
          <Link to="/services/detailing" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Auto Detailing</div>
          </Link>
          <Link to="/services/mobile-detailing" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Mobile Detailing</div>
          </Link>
          <Link to="/services/paint-protection-film" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Paint Protection Film</div>
          </Link>
          <Link to="/services/ceramic-coatings" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Ceramic Coatings</div>
          </Link>
          <Link to="/services/window-tinting" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Window Tinting</div>
          </Link>
          <Link to="/services/windshield-protection-film" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Windshield Protection Film</div>
          </Link>
          <Link to="/services/paint-correction" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Paint Correction</div>
          </Link>
          <Link to="/services/additional-services" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Additional Services</div>
          </Link>
        </div>
        <div className={classes.footerPageColumn}>
          <div className={classes.footerLabel}>Misc</div>
          <Link to="/before-and-after" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>Before & After</div>
          </Link>
          <Link to="/faq" style={{ textDecoration: 'none' }}>
          <div className={classes.footerPageLink}>FAQs</div>
          </Link>
        </div>
        <div className={classes.addressColumn}>
          <div className={classes.footerLabel}>Business info</div>
          <div className={classes.businessInfo}>
            <div class="contact-details-wrapper">
              <a href="https://maps.app.goo.gl/QFjgzaEzVkWFQyQw6" target="_blank" className={classes.contactDetailsText}>
                <strong>Address:</strong> Marietta, GA USA
              </a>
              <a href="tel:(502)417-0690" className={classes.contactDetailsText}>
                <strong>Phone: Call or Text </strong>(502) 417-0690
              </a>
              <div className={classes.contactDetailsText}>
                <strong>Mon-Fri:</strong> 8:30&nbsp;AM to 6:00 PM<br /><strong>Sat</strong>: 10:00&nbsp;AM to 4:00 PM<br /><strong>Sun:</strong>&nbsp;Closed (Appointment Only)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.footerContainer2}>
      <a href="http://www.flattdevelopment.com" target="_blank" className={classes.credits}>
        <img src="https://www.flattdevelopment.com/images/logo-time.png" loading="lazy" width="100" alt="" className={classes.flogo} />
        {/* <div className={classes.footerBottomText}>Website by <span className={classes.textSpan}>Flatt Development</span></div> */}
      </a>
        <div className={classes.footerBottomText}>Copyright 2024 All Rights Reserved</div>
    </div>
    </div>
  )
}

export default Footer2;
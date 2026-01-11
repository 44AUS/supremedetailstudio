import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import data from '../data/why.json';
import { ToastContainer, toast } from 'react-toastify';
import { Container, SimpleGrid, Title, createStyles } from '@mantine/core';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input, Textarea} from "@nextui-org/react";
import ContactUsHero from '../components/Heroes/ContactUsHero';
import { Helmet } from 'react-helmet';
import Map from '../components/Map';


const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 80,
    position: 'relative',
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
    borderRadius: '5px',
    // backgroundColor: 'rgb(15,15,15)',
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
    borderRadius: '5px',
    width: '100%',
    height: '350px',
    // boxShadow: '0 15px 50px 0 rgb(23 25 47)',
    [theme.fn.smallerThan('sm')]: {
      height: '250px',
    },
    [theme.fn.smallerThan('md')]: {
      height: '295px',
    },
  },
  contactBox: {
  },
  form: {
    marginBottom: 0,
    paddingLeft: '2rem',
    borderRadius: '0px',
    // backgroundColor: 'rgb(15,15,15)',
    [theme.fn.smallerThan('md')]: {
      paddingLeft: '0',
    },
  },
  formTitle: {
    marginBottom: '10px',
    color: '#ebebeb',
    fontFamily: `SceneProUltBlkIt`,
    fontSize: '1.44rem',
    fontWeight: 700,
    paddingBottom: '1.25rem',
  },
  whyChooseUs: {
    marginBottom: '0.25rem',
    color: '#ebebeb',
    fontFamily: `SceneProUltBlkIt`,
    fontSize: '1.44rem',
    fontWeight: 700,

  }
}));

const Contact = () => {
  const { classes } = useStyles();
  const form = useRef();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
      <title>Expert Vehicle Care Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Expert Vehicle Care Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Expert Vehicle Care Marietta, GA | Supreme Detail Studio' />
      <meta property="og:description" content='Want more out of your vehicle, home, or office? Contact Supreme Detail Studio today at (502) 417-0690 to learn more about what we offer your vehicle!' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <ContactUsHero />
    <Container size="xl">
      <div className={classes.wrapper}>
        <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        >
          <div>
            <iframe 
            className={classes.video} 
            src="https://www.youtube.com/embed/9DEjaGuwPKY" 
            style={{ marginBottom: 25 }} 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>
            <div className={classes.whyUs}>
            {/* <div className={classes.title}>What happens next?</div> */}
            <Title className={classes.whyChooseUs}>WHY YOU SHOULD CHOOSE US</Title>
            {data.map((why, key) => {
              return (
                <div className={classes.whyDetailInner} key={key}>
                 <svg clip-rule="evenodd" fill="#FFF" width="24" height="24" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>
                <div>{why.title}</div>
              </div>
            )})}
            </div>
          </div>
          <div className={classes.form}>
            <Title className={classes.formTitle}>COMPLETE THE FORM BELOW</Title>
            <iframe src="https://app.urable.com/form/rB9FHJFIfifYgU8Ty9Yw/LylS3TUIRYzhBmg9pjjp" className={classes.contactBox} scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="900px" width="100%"></iframe>
            {/* <form ref={form} onSubmit={sendEmail}>
            <div className="w-full grid grid-cols-1 gap-4">
            <Input

      type="name"
      name="from_name"
      pattern="^(\w\w+)\s(\w+)$"
      label="First and Last Name"
      variant="bordered"
      className="max"
    />
                          <Input

type="email"
name="email"
label="Email"
variant="bordered"
className="max"
/>
                          <Input

type="number"
name="number"
label="Phone Number"
variant="bordered"
className="max"
/>

<Textarea
      label="Questions/Comments"
      variant="bordered"
      labelPlacement="inside"
      // value="Please give us a brief description of your questions, comments, or concerns."
      className="max"
      name="description"
    />
              </div>
              <div style={{ margin: 'auto', marginTop: '15px', display: 'block', float: 'right' }}>
          <Button 
          type="submit" radius="none" size="md" variant="shadow" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            Send Message
          </Button>
              </div>
            </form> */}
          </div>
        </SimpleGrid>
      </div>
    </Container>
    <Map />
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    </>
  )
}

export default Contact;
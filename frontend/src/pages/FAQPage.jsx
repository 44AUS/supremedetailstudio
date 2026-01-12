import React from 'react';
import { Container, Title, SimpleGrid, Accordion, createStyles } from '@mantine/core';
import FAQHero from '../components/Heroes/FAQHero';
import { Helmet } from 'react-helmet';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 0,
    position: 'relative',
  },
  h1: {
    marginTop: '1.25rem',
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
	  },
  },
  desc: {
    fontFamily: 'SceneProRg',
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
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
  item: {
		backgroundColor: '#000',
		color: '#FFF',
		borderRadius: '0px',
		border: '1px solid rgba(202,204,255,.1)',
		overflow: 'hidden',
    '&[data-active]': {
      backgroundColor: 'transparent',
      borderColor: 'rgba(202,204,255,.1)',
    },
	},
	control: {
		fontSize: theme.fontSizes.lg,
		padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
		color: theme.black,
		'&:hover': {
		  backgroundColor: 'transparent',
    },
	},
	content: {
		paddingLeft: theme.spacing.xl,
		lineHeight: 1.6,
		color: theme.black,
	},
	icon: {
		marginLeft: theme.spacing.md,
  },
	gradient: {
    backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
		  theme.colors[theme.primaryColor][5]
		} 100%)`,
	},
  bgShape: {
    zIndex: -1,
    width: '100%',
    position: 'absolute',
    top: '0%',
    bottom: 'auto',
    left: '0%',
    right: '0%',
    animation: 'fadein 1s',
  },
}));

const FaqPage = () => {
  const { classes } = useStyles();

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
    <FAQHero />
    <Container size="lg">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>YOU HAVE QUESTIONS? WE HAVE ANSWERS</Title>
        <div className={classes.desc}>
          Sometimes, you just want a straight answer about how things work. Here’s a list of common questions, and how we handle business.
        </div>
        <Accordion
      chevronPosition="right"
      defaultValue="none"
      chevronSize={50}
      variant="separated"
      >
        <Accordion.Item className={classes.item} value="mobile">
        
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000',
            borderRadius: '0px',
          }}>
              Are you mobile? Can you come to me?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
              Yes! We offer mobile services, though at this time we do require use of power and water source.
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="deposit">
        
        <Accordion.Control 
        style={{ 
          color: '#ebebeb', 
          fontFamily: "'Montserrat', sans-serif", 
          fontSize: '1.125rem', 
          fontWeight: '700', 
          backgroundColor: '#000',
          borderRadius: '0px',
        }}>
            Why do you require a deposit?
          </Accordion.Control>
        <Accordion.Panel 
        style={{ 
          backgroundColor: '#000', 
          fontFamily: "'Montserrat', sans-serif", 
          color: 'hsla(0,0%,67.1%,.8)',
          lineHeight: '1.75rem',
        }}>
          Due to the high demand for our services and the increase of cancellations and no shows, Supreme Detail Studio will officially require all new & old clients to make a 10% deposit in order to secure their appointment.
          </Accordion.Panel>
      </Accordion.Item>
        

        <Accordion.Item className={classes.item} value="appointment">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Do I need an appointment?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Yes! All services require an appointment. This is only so we can allocate the appropriate time and so we can provide you the highest quality service.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="paint-correction">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              What is a paint correction?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            In our industry, paint correction is known as the removal of swirls and minor defects on your paint. If you look at your vehicles paint under sunlight or a direct light, you will see lots of scratches that are in the shape of circles and look like swirls. Paint correction can also repair faded paint and make it gloss once again. Depending on your paints condition, we may be able to make your vehicle gloss like never before. 
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="need-ceramic">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              How do I know if I need a ceramic coating?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            When it comes to any type of coatings, whether it be, waxes, sealants, or ceramic coats, it’s all personal preference. Coatings are a layer of protection on your paint, and ceramic coating is the most complex and durable type of protection. 
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="ceramic-coat">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              What is a ceramic coating?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            A ceramic coating has similarities to a traditional wax but with more protection and durability. A ceramic coating comes in a form of a liquid which is applied to the paint and then hardens to create a thin layer of paint protection. There are lots of ceramic coatings in the market, but they all essentially do the same thing. Ceramic coatings create a hydrophobic affect which allows liquids to easily slide or roll off the paint and doesn’t allow any liquid to sit on the paint for long periods of time. Ceramic coatings provide protection against, water stains, road grime, bird droppings, and more. We advise to get a ceramic coating on brand new cars, vintage cars, or any car you truly care about and want to take care of. To get a ceramic coating, your vehicle first must go through a paint correction stage, and this is essentially the most complicated part of the whole process. For any other questions feel free to give us a call at 502-417-0690!
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="car-wash">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Whats the difference between you, and a drive-thru car wash? They are much cheaper.
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            If you truly care about your cars appearance you will never put your car through one of those washes. No matter how much a drive-thru car wash claims how soft their bristles are, they will always damage and scratch your car. Those car washes rarely wash and clean their brushes, so all that dirt that’s getting “cleaned” off cars is staying on those brushes and rubbing on your paint causing the damages and scratches. That is why we use what’s called the 2 bucket method when washing your paint, and we clean our wash mitts thoroughly after every car – no exceptions. 
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="difference">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              Whats the difference between a car wash and a car detail?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            In our opinion, the difference in a detail is that we clean areas of the car that normally would be overlooked in a regular wash and we take a step further to enhance the cleaning. That includes, the shampooing of seats and carpets, steam cleaning the interior, etc. 
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="insurance">
          <Accordion.Control 
          style={{ 
            color: '#ebebeb', 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '1.125rem', 
            fontWeight: '700', 
            backgroundColor: '#000' 
          }}>
              What happens if a mistake occurs?
            </Accordion.Control>
          <Accordion.Panel 
          style={{ 
            backgroundColor: '#000', 
            fontFamily: "'Montserrat', sans-serif", 
            color: 'hsla(0,0%,67.1%,.8)',
            lineHeight: '1.75rem',
          }}>
            Mistakes happen. However, we take the top precautions to handle your vehicle. We are in constant training and always learning the most effective and safe methods when it comes to detailing. In the event of any damage to your vehicle, we are fully insured with Garage Keepers insurance to protect your vehicle.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      </div>
    </Container>
    </>
  )
}

export default FaqPage;
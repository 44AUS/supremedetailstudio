import React from 'react';
import { SimpleGrid, Card, Image, Title, Text, Container, AspectRatio, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const mockdata = [
  {
    title: 'What is Paint Protection Film?',
    image:
      'https://www.supremedetailstudio.com/static/media/ppf-install.939c8f4efe80fca2d17c.jpg',
    decription: 'Paint Protection Film is the best way to protect your car from road debris, paint chips, and much more. Learn about all the awesome benefits of applying PPF to your vehicle in this blog.',
  },
  {
    title: 'The Top Five Reasons You Need Window Tint',
    image:
      'https://www.supremedetailstudio.com/static/media/tint.0ced29bc158fad5f37bb.jpeg',
    decription: 'Most people think they don’t need window tint because they live in Louisville, KY. Then a heat wave comes, their seats or steering wheels are on fire, and they only have themselves to blame. There…',
  },
];

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
  wrapper: {
    paddingTop: '15px',
    paddingBottom: '30px',
    position: 'relative',
  },
  h1: {
    marginTop: '20px',
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
  partnerLogo: {
    float:'none',
    top: '0px',
    left:0,
    width:'calc(100% - 668px)',
    position:'relative',
    height:'auto',
    paddingTop:'0px',
    paddingLeft:'0px',
    paddingBottom:'0px',
    maxWidth:'252px',
    paddingRight:'0px',
    minWidth:'25px',
    textAlign:'start',
    display:'block',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:'14px',
    marginBottom:'15px',
    [theme.fn.smallerThan('md')]: {
      maxWidth:'152px',
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
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: '18px',
    margin: 'auto'
  },
  smallHeading: {
    fontFamily: `Outfit, ${theme.fontFamily}`,
    color: '#ebebeb',
    fontSize: '2rem',
    lineHeight: '1.28125',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  control: {
		paddingLeft: 50,
		paddingRight: 50,
		fontFamily: `Outfit, ${theme.fontFamily}`,
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
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    backgroundColor: 'rgb(15,15,15)',
    color: '#FFF',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    // border: '1px solid rgba(202,204,255,.1)',
  },

  section: {
    borderBottom: `1px solid rgba(202,204,255,.1)`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    fontFamily: `Outfit, ${theme.fontFamily}`,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const BlogPage = () => {
  const { classes, theme } = useStyles();

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text mt="md" style={{ fontFamily: 'SceneProUltBlk', fontSize: '23px' }}>
        {article.title}
      </Text>
      <Text style={{ fontFamily: 'SceneProRg', fontSize: '15px' }} mb={5}>
        {article.decription}
      </Text>
      <Text component="a" href="#" style={{ fontFamily: 'SceneProRg', fontSize: '14px', opacity: '.8' }} mt={5}>
        Read more →
      </Text>
    </Card>
  ));

  return (
    <>
    <Helmet>
      <title>Supreme Detail Studio Blog | Paint Protection, Tint, and Ceramic Coatings</title>
      <meta name='title' content='Supreme Detail Studio Blog | Paint Protection, Tint, and Ceramic Coatings' />
      <meta name='description' content='Learn about the awesome benefits of applying PPF to your vehicle. At Supreme Detail Studio, our certified installers ensure a flawless application, standing steadfastly behind our commitment to excellence. Protect your investment with PPF and ceramic coating from Supreme Detail Studio.' />
      <meta name='keywords' content='louisville ky Paint Protection Film, supreme detail studio, louisville mobile car detailing, louisville undercarriage detailing, louisville mobile car wash, louisville Paint Protection Film, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Supreme Detail Studio Blog | Paint Protection, Tint, and Ceramic Coatings' />
      <meta property="og:description" content='Learn about the awesome benefits of applying PPF to your vehicle. At Supreme Detail Studio, our certified installers ensure a flawless application, standing steadfastly behind our commitment to excellence. Protect your investment with PPF and ceramic coating from Supreme Detail Studio.' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
    <div className={classes.bgBody}>
    <Container size="xl">
      <div className={classes.wrapper}>
        {/* <div className={classes.partner}>
        <Link to="https://www.stek-usa.com/" target="_blank">
        <Image src={StekRed} alt="Tesla Model S" className={classes.partnerLogo} />
        </Link>
        </div> */}
        <Title className={classes.h1}>Supreme Detail Studio Blog</Title>
        <div className={classes.desc}>
        Paint Protection, Tint, and Ceramic Coatings
        </div>
        <SimpleGrid
        cols={2}
        spacing="sm"
        breakpoints={[
          { maxWidth: '62rem', cols: 2, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}>
          {cards}
        </SimpleGrid>
      </div>
    </Container>
    </div>
    </>
  )
}

export default BlogPage;
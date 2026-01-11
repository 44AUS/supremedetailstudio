import React from 'react';
import { Container, Title, SimpleGrid, createStyles } from '@mantine/core';
import ServicesCard from './ServicesCard';
import LeatherCoating from '../../assets/images/details/leather-seats.jpg';
import Tesla from '../../assets/images/details/tesla-rear.jpg';
import BMWInterior from '../../assets/images/details/bmw-dashboard.jpg';
import BMWSeats from '../../assets/images/details/leather-seats.jpg';
import CeramicCoating from '../../assets/images/ceramic-coatings/onyx-coating.jpg';
import PPF from '../../assets/images/ppf/dynoshield.jpg';
import FashionPPF from '../../assets/images/ppf/dynostorm.jpeg';
import Tinting from '../../assets/images/tint/vette-tint.jpg';
import VinylWrap from '../../assets/images/details/porsche.jpg';
import WheelRepair from '../../assets/images/details/wheels.jpg';
import DentRepair from '../../assets/images/details/steam-clean.jpg';
import PaintChipRepair from '../../assets/images/details/headlight-restoration.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '4rem',
    // paddingBottom: '4rem',
    position: 'relative',
  },
  h1: {
    marginTop: 0,
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
  h1Why: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    textAlign: 'center',
    color: '#fff',
    fontSize: '22px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 20,
      textAlign: 'center',
	  },
  },
  WhyDesc: {
    fontFamily: `SceneProRg`,
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.8,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
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
  benefitIcon: {
    fontFamily: `SceneProRg`, 
    fontSize: '16px',
    fontWeight: 800,
    color: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    display: 'flex',
    width: '48px',
    height: '48px',
    border: '2px solid #fff',
    borderRadius: '100%',
    marginBottom: '24px',
    '@media (max-width: 520px)': {
      width: '38px',
      height: '38px',
	  },
  },
  serviceBox: {
    marginRight: '20px'
  }
}));

const Services = () => {
  const { classes } = useStyles();

  const settings = {
    dots: false,
    centerMode: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    arrows: true,
    // rows: 2,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <>
    <Container size="xl" id="#services">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>OUR DETAILING SERVICES</Title>
        <div className={classes.desc}>
          SUPERIOR SERVICE & SUPERIOR QUALITY
        </div>

        <Slider {...settings}>

        <div>
        <ServicesCard
          titleProp='Auto Detailing'
          linkProp='/services/detailing'
          imageProp={BMWInterior}
          descriptionProp='Much more than just your ordinary car wash. Come see what the premium side of detailing can do for your vehicle.'
          />
        </div>

        <div className={classes.serviceBox}>
        <ServicesCard
          titleProp='Paint Protection Film (PPF)'
          linkProp='/services/paint-protection-film'
          imageProp={PPF}
          comingSoonProp={true}
          descriptionProp='Protect and preserve the paint of your vehicle against rock chips, road debris and minor scratches with our professionally installed Paint Protection Film.'
          />
        </div>
        
        <div>
        <ServicesCard
          titleProp='Ceramic Coating'
          linkProp='/services/ceramic-coatings'
          imageProp={CeramicCoating}
          reccomendedProp={true}
          descriptionProp='Provides durable and long-lasting protection to surfaces from light scratches, UV rays, chemicals, and environmental contaminants.'
          />
        </div>
        <div>
        <ServicesCard
          titleProp='Window Tinting'
          linkProp='/services/window-tinting'
          imageProp={Tinting}
          comingSoonProp={true}
          descriptionProp='Protect the interior of your vehicle, office, or residence from harmful UV rays and the Louisville heat.'
          />
        </div>
        <div>
        <ServicesCard
          titleProp='Paint Correction'
          linkProp='/services/paint-correction'
          imageProp={Tesla}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div>
        {/* <div>
        <ServicesCard
          titleProp='Fashion Series PPF'
          linkProp='/services/fashion-series-ppf'
          imageProp={FashionPPF}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div>
        <div>
        <ServicesCard
          titleProp='Vinyl Wrap & Chrome Deletion'
          linkProp='/services/vinyl-wrap-chrome-deletion'
          imageProp={VinylWrap}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div> */}
        <div>
        <ServicesCard
          titleProp='Wheel Repair (Coming Soon)'
          linkProp='/services/wheel-repair'
          imageProp={WheelRepair}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div>
        {/* <div>
        <ServicesCard
          titleProp='Paint Chip Repair (Coming Soon)'
          linkProp='/services/paint-chip-repair'
          imageProp={PaintChipRepair}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div> */}
        <div>
        <ServicesCard
          titleProp='Paintless Dent Repair (Coming Soon)'
          linkProp='/services/paintless-dent-repair'
          imageProp={DentRepair}
          popularProp={true}
          descriptionProp='Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you.'
          />
        </div>
        <div>
        <ServicesCard
          titleProp='Additional Services'
          linkProp='/services/additional-services'
          imageProp={BMWSeats}
          descriptionProp='Customize your detailing experience with the additional services we offer.'
          />
        </div>
      </Slider>

      </div>
    </Container>
    
    </>
  )
}

export default Services;
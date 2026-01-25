import React from 'react';
import { Container, Title, createStyles } from '@mantine/core';
import ServicesCard from './ServicesCard';

import BMWInterior from '../../assets/images/details/bmw-dashboard.jpg';
import BMWSeats from '../../assets/images/details/leather-seats.jpg';
import Tesla from '../../assets/images/details/tesla-rear.jpg';
import CeramicCoating from '../../assets/images/ceramic-coatings/onyx-coating.jpg';
import PPF from '../../assets/images/ppf/dynoshield.jpg';
import Tinting from '../../assets/images/tint/vette-tint.jpg';
import WheelRepair from '../../assets/images/details/wheels.jpg';
import DentRepair from '../../assets/images/dent-repair/pdr.jpg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IoIosArrowForward } from 'react-icons/io';

/* -------------------- MODERN ARROWS -------------------- */

const Arrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 20,
        transition: 'background 0.25s ease',
      }}
    >
      <div
        style={{
          transition: 'transform 0.25s ease',
        }}
        className="arrow-inner"
      >
        <IoIosArrowForward
          size={22}
          style={{
            color: '#fff',
            transform: direction === 'prev' ? 'rotate(180deg)' : 'none',
          }}
        />
      </div>
    </div>
  );
};


const NextArrow = (props) => <Arrow {...props} direction="next" />;
const PrevArrow = (props) => <Arrow {...props} direction="prev" />;

/* -------------------- STYLES -------------------- */

const useStyles = createStyles(() => ({
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    backgroundColor: '#000',
    position: 'relative',
  },
  h1: {
    fontFamily: "'Oswald', sans-serif",
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#e80200',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '2rem',
  },
}));

/* -------------------- COMPONENT -------------------- */

const Services = () => {
  const { classes } = useStyles();

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container size="xl" id="services">
      <div className={classes.wrapper}>
        <Title className={classes.h1}>OUR DETAILING SERVICES</Title>
        <div className={classes.desc}>SUPERIOR SERVICE & SUPERIOR QUALITY</div>

        <Slider {...settings}>
          <ServicesCard
            titleProp="Auto Detailing"
            linkProp="/services/detailing"
            imageProp={BMWInterior}
          />

          <ServicesCard
            titleProp="Paint Protection Film"
            linkProp="/services/paint-protection-film"
            imageProp={PPF}
          />

          <ServicesCard
            titleProp="Ceramic Coating"
            linkProp="/services/ceramic-coatings"
            imageProp={CeramicCoating}
          />

          <ServicesCard
            titleProp="Window Tinting"
            linkProp="/services/window-tinting"
            imageProp={Tinting}
          />

          <ServicesCard
            titleProp="Paint Correction"
            linkProp="/services/paint-correction"
            imageProp={Tesla}
            popularProp
          />

          <ServicesCard
            titleProp="Wheel Repair"
            linkProp="/services/wheel-repair"
            imageProp={WheelRepair}
          />

          <ServicesCard
            titleProp="Paintless Dent Repair"
            linkProp="/services/paintless-dent-repair"
            imageProp={DentRepair}
          />

          <ServicesCard
            titleProp="Additional Services"
            linkProp="/services/additional-services"
            imageProp={BMWSeats}
          />
        </Slider>
      </div>
    </Container>
  );
};

export default Services;

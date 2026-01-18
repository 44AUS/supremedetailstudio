import React from 'react';
import { Container, Title, Text, Button, SimpleGrid, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
// import PianoBlack from '../../assets/images/details/piano-black-trim.jpg';
import Tesla from '../../assets/images/details/tesla-front.jpg';
import BMWInterior from '../../assets/images/details/bmw-steering-wheel.jpg';
import ServicesCard from '../Services/ServicesCard';
import TeslaFoam from '../../assets/images/details/tesla-foam-bath.jpg'

const useStyles = createStyles((theme) => ({
}));

const DetailingServices = () => {
  const { classes } = useStyles();

  return (
    <>
    <div style={{ paddingBottom: '15px' }}>
        <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 1, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
        >

          <ServicesCard
          titleProp='Full Detail'
          linkProp='/services/full-detail'
          imageProp={TeslaFoam}
          reccomendedProp={false}
          descriptionProp='If you are looking to get your exterior and interior cleaned this package is for you'
          />
          
          <ServicesCard
          titleProp='Exterior Detail'
          linkProp='/services/exterior-detail'
          imageProp={Tesla}
          popularProp={false}
          descriptionProp='If you only want your exterior detailed, this option is for you'
          />
          
          <ServicesCard
          titleProp='Interior Detail'
          linkProp='/services/interior-detail'
          imageProp={BMWInterior}
          descriptionProp='If you only want your interior detailed, this option is for you'
          />

        </SimpleGrid>
        </div>
    </>
  )
}

export default DetailingServices;
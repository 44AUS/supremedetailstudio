import React from 'react'
import { SimpleGrid } from '@mantine/core';
import AutomotiveTint from '../../assets/images/tint/tint-2.jpg';
import ResidentialTint from '../../assets/images/tint/residential-tint.jpeg';
import CommercialTint from '../../assets/images/tint/commercial-tint-bg.jpeg';
import ServicesCard from '../Services/ServicesCard';

const WindowTintComponent = () => {
  return (
    <div>
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
          titleProp='Automotive Tinting'
          linkProp='/services/automotive-tinting'
          imageProp={AutomotiveTint}
          reccomendedProp={false}
          descriptionProp='We offer a variety of automotive film installations such as deep dyed, nano ceramic, and multi layered nano ceramic.'
          />
          <ServicesCard
          titleProp='Residential Tinting'
          linkProp='/services/residential-tinting'
          imageProp={ResidentialTint}
          reccomendedProp={false}
          descriptionProp='We offer a variety of residential film installations such as solar, security, and decorative.'
          />
          <ServicesCard
          titleProp='Commercial Tinting'
          linkProp='/services/commercial-tinting'
          imageProp={CommercialTint}
          reccomendedProp={false}
          descriptionProp='We offer a variety of commercial film installations such as solar, security, and decorative.'
          />
      </SimpleGrid>
    </div>
  )
}

export default WindowTintComponent;
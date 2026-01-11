import React from 'react';
import { Image, Tabs, Container, SimpleGrid, createStyles } from '@mantine/core';
import PackageCard from '../PackageCard';
import styling from './Ppf.module.css';
import partialFrontPpf from '../../assets/images/ppf/partial-front.png';
import fullFrontPpf from '../../assets/images/ppf/full-front-end.png';
import trackPpf from '../../assets/images/ppf/track-pack.png';
import fullPpf from '../../assets/images/ppf/full-body.png';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#111',
  },
  wrapper: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    position: 'relative',
  },
}));

const LPFComponent = () => {
  const { classes, theme } = useStyles();

  const LPFPackage = [
    'Puncture Resistant',
    'Hydrophobic (advanced water-repelling properties)',
    'Anti-Contamination (stain resistant)',
    'Fast Recovery Self-Healing (by heat or hot water)',
    'STEK Light Protection Film (LPF) has a 7-year warranty against delaminating, yellowing, bubbling and cracking.',
  ]

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
        
        <PackageCard
        packageTitle="DYNOshield"
        packageDuration="DYNOshield gives your lights world class protection at the same time as an extremely clear glossy finish."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />

                <PackageCard
        packageTitle="DYNOstorm"
        packageDuration="Our lightest neutral gray color that compliments a huge variety headlights and taillights. DYNOstorm gives your lights world class protection at the same time as an extremely glossy finish and a subtle sense of sleek."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />

      <PackageCard
        packageTitle="DYNOshade"
        packageDuration="DYNOshade gives you a beautifully shaded light making a subtle difference that protects and enhances both lenses and housing."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
       
      <PackageCard
        packageTitle="DYNOshadow"
        packageDuration="DYNOshadow offers you a medium darkness with a beautiful charcoal color tone. Perfect for those wanting a sleek and mature look not quite as dark as DYNOsmoke."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />

      <PackageCard
        packageTitle="DYNOsmoke"
        packageDuration="DYNOsmoke is the darkest option for those pursuing a stealthy look. Perfect for toning down chrome housing or adding a touch of unique to your headlights, taillights and turn signals."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        
        <PackageCard
        packageTitle="DYNOyellow"
        packageDuration="DYNOyellow is a classic yellow film. Inspired by race cultures across the globe, give your car or truck a track and off-road personality with worthy protection."
        included={LPFPackage}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        </SimpleGrid>
    </div>
  )
}

export default LPFComponent;
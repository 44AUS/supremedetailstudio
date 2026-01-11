import React from 'react'
import PackageCard from '../PackageCard';
import { SimpleGrid } from '@mantine/core';

const InteriorDetail = () => {
  const deluxeInterior = [
    'Thorough vacuum of floors, mats, seats, and trunk',
    'Clean door and trunk jambs',
    'Interior air compressor blow-out for dust, interior prepped and cleaned',
    'Steam clean all panels, cracks/crevices, cup holders, and seatbelts, for maximum sanitation',
    'UV Protectant is applied to interior dash and plastics',
    'Leather is deep cleaned and conditioned',
    'Shampoo floor mats, cloth seats, and carpeting in cabin and trunk',
    'Streak-free interior glass cleaning',
    'CarFax record update',
  ]

  const supremeInterior = [
    'Thorough vacuum of floors, mats, seats, and trunk',
    'Clean door and trunk jambs',
    'Interior air compressor blow-out for dust, interior prepped and cleaned',
    'Steam clean all panels, cracks/crevices, cup holders, and seatbelts, for maximum sanitation',
    'Steam clean headliner for maximum sanitation',
    'UV Protectant is applied to interior dash and plastics',
    'Leather is deep cleaned and conditioned',
    'Shampoo floor mats, cloth seats, and carpeting in cabin and trunk',
    'Heat extract floor mats, cloth seats, and carpeting in cabin',
    'Streak-free interior glass cleaning',
    'CarFax record update',
  ];

  return (
    <div>
      <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: '62rem', cols: 2, spacing: 'md' },
        { maxWidth: '48rem', cols: 1, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
      >
        <PackageCard
        packageTitle="Deluxe Interior Detail"
        packageDuration="4 - 5 Hours"
        included={deluxeInterior}
        price="Starting at $150"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/uy5qfFLCeJzakhEg4vUr"
        />
        <PackageCard
        packageTitle="Supreme Interior Detail"
        packageDuration="5 - 7 Hours"
        included={supremeInterior}
        price="Starting at $200"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/uy5qfFLCeJzakhEg4vUr"
        />
      </SimpleGrid>
    </div>
  )
}

export default InteriorDetail;
import React from 'react'
import PackageCard from '../PackageCard';
import { SimpleGrid } from '@mantine/core';

const FullDetail = () => {
  const basicFull = [
   'Two bucket hand wash ',
   'Bug and tar removal',
   'Tires, wheels, and wheel wells cleaned and dressed',
   'Paint is coated with high-quality wax',
   'Streak-free exterior glass cleaning',
  
   'Thorough vacuum of floors, mats, seats, and trunk',
   'Clean door and trunk jambs',
   'Interior air compressor blow-out for dust, interior prepped and cleaned',
   'Steam clean all panels, cracks/crevices, cup holders, and seatbelts, for maximum sanitation',
   'UV Protectant is applied to interior dash and plastics',
   'Leather is deep cleaned and conditioned',
   'Shampoo floor mats, cloth seats, and carpeting in cabin and trunk',
   'Streak-free interior glass cleaning',
   'CarFax record update',
  ];

  const deluxeFull = [
    'Two bucket hand wash ',
    'Tires, wheels, and wheel wells cleaned and dressed',
    'Decontaminate paint to remove minor bugs/tar/grime',
    'Decontaminate remaining impurities with clay-bar',
    'Paint Enhancement with Dual Action Polisher',
    'Paint is coated with high-quality sealant',
    'Streak-free exterior glass cleaning',
  
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

  const supremeFull = [
    'Two bucket hand wash ',
    'Tires, wheels, and wheel wells cleaned and dressed',
    'Decontaminate paint to remove minor bugs/tar/grime',
    'Decontaminate remaining impurities with clay-bar',
    'Paint Enhancement with Dual Action Polisher',
    'Paint is coated with high-quality sealant',
    'Streak-free exterior glass cleaning',
    'Engine bay detailed and dressed',
    'Undercarriage wash',
  
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
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: '62rem', cols: 3, spacing: 'md' },
        { maxWidth: '48rem', cols: 1, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
      >
                <PackageCard
        packageTitle="Basic Full Detail"
        packageDuration="4 - 6 Hours"
        included={basicFull}
        price="Starting at $200"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/5LTnIxwkaRtzxp8x1Ixg"
        />
        <PackageCard
        packageTitle="Deluxe Full Detail"
        packageDuration="5 - 7 Hours"
        included={deluxeFull}
        price="Starting at $325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/5LTnIxwkaRtzxp8x1Ixg"
        />
        <PackageCard
        packageTitle="Supreme Full Detail"
        packageDuration="7 - 8 Hours"
        included={supremeFull}
        price="Starting at $400"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/5LTnIxwkaRtzxp8x1Ixg"
        />
      </SimpleGrid>
    </div>
  )
}

export default FullDetail;
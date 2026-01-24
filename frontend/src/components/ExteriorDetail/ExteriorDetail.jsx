import React from 'react'
import PackageCard from '../PackageCard';
import { SimpleGrid } from '@mantine/core';

const ExteriorDetail = () => {
  const basicExterior = [
    'Two bucket hand wash', 
    'Tires, wheels, and wheel wells cleaned and dressed', 
    'Bug and tar removal', 
    'Paint is coated with high-quality wax', 
    'Streak-free exterior glass cleaning', 
    'CarFax record update'
  ]
  const deluxeExterior = [
    'Two bucket hand wash', 
    'Tires, wheels, and wheel wells cleaned and dressed', 
    'Door and trunk jambs cleaned', 
    'Bug and tar removal', 
    'Decontaminate remaining impurities with clay-bar',
    'Paint Enhancement with Dual Action Polisher',
    'Paint is coated with high-quality sealant',
    'Streak-free exterior glass cleaning',
    'CarFax record update'
  ]
  const supremeExterior = [
    'Two bucket hand wash', 
    'Tires, wheels, and wheel wells cleaned and dressed', 
    'Door and trunk jambs cleaned', 
    'Bug and tar removal', 
    'Decontaminate remaining impurities with clay-bar',
    'Paint Enhancement with Dual Action Polisher',
    'Paint is coated with high-quality sealant',
    'Streak-free exterior glass cleaning',
    'Engine bay detailed and dressed',
    'Undercarriage wash',
    'CarFax record update'
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
        packageTitle="Basic Exterior Detail"
        packageDuration="1.5 - 2 Hours"
        included={basicExterior}
        price="Starting at $75"
        bookingLink="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
        />
        <PackageCard
        packageTitle="Deluxe Exterior Detail"
        packageDuration="2 - 3 Hours"
        included={deluxeExterior}
        price="Starting at $200"
        bookingLink="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
        />
        <PackageCard
        packageTitle="Supreme Exterior Detail"
        packageDuration="3 - 4 Hours"
        included={supremeExterior}
        price="Starting at $250"
        bookingLink="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD"
        />

      </SimpleGrid>
    </div>
  )
}

export default ExteriorDetail;
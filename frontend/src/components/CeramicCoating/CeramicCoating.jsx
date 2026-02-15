import React from 'react'
import { SimpleGrid } from '@mantine/core';
import PackageCard from '../PackageCard';

const CeramicCoatingComponent = () => {
  const levelOne = [
    'Clean wheels, wheel wells, and tires',
    'Complete wash',
    'Paint decontamination',
    'Decontaminate remaining impurities with clay-bar',
    '1 step paint correction (2 step paint correction add $200)',
    'Application of Ceramic Coating to all painted surfaces, headlights, taillights, trim, and wheel faces',
    'CarFax record update',
  ];

  return (
    <div>
      <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: '62rem', cols: 4, spacing: 'md' },
        { maxWidth: '48rem', cols: 1, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
      >
                        <PackageCard
        packageTitle="RENEW SPRAYABLE CERAMIC"
        packageDuration="9 Months"
        included={levelOne}
        price="$350"
        bookingLink="/book-appointment"
        />
                <PackageCard
        packageTitle="DIAMOND SS"
        packageDuration="3 Years"
        included={levelOne}
        price="$650"
        bookingLink="/book-appointment"
        />
        <PackageCard
        packageTitle="PRO"
        packageDuration="6 Years"
        included={levelOne}
        price="$1,000"
        bookingLink="/book-appointment"
        />
        <PackageCard
        packageTitle="MAX G+"
        packageDuration="10 Years"
        included={levelOne}
        price="$1,850"
        bookingLink="/book-appointment"
        />
      </SimpleGrid>
    </div>
  )
}

export default CeramicCoatingComponent;
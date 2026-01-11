import React from 'react'
import PackageCard from '../PackageCard';
import { SimpleGrid } from '@mantine/core';

const PaintCorrectionComponent = () => {
  const stageOne = [
    'Includes our Deluxe Exterior package', 
    'Paint is analyzed using a paint depth gauge to determine thickness', 
    '1 Step Polishing (removes light swirls/scratches)', 
    'Trim, decals and emblems are taped off for protection', 
    'Paint sealant applied for long-lasting protection', 
    'CarFax record update'
  ]

  const stageTwo = [
    'This stage is recommended for vehicles that are older or have moderate scratches and/or swirl marks',
    'Includes everything in Step 1 Correction and the additional services below', 
    'Additional round of compounding, which removes more serious swirls/scratches', 
    'CarFax record update', 
  ]
  
  const stageThree = [
    'Wet Sanding to level Paint Texture (Orange Peel) or Paint Correction for Severe Defect Removal'
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
        packageTitle="Single Stage Correction"
        packageDuration="4 - 6 Hours"
        included={stageOne}
        price="$300 - $375"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/joHM8Dxh2Y2E9HsOXeF2"
        />
        <PackageCard
        packageTitle="Two Stage Correction"
        packageDuration="8 - 12 Hours"
        included={stageTwo}
        price="$500 - $575"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/joHM8Dxh2Y2E9HsOXeF2"
        />
        <PackageCard
        packageTitle="Wet sanding or by the hour paint correction"
        packageDuration="2 - 3 Days"
        included={stageThree}
        price="$150 Per Hour"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/joHM8Dxh2Y2E9HsOXeF2"
        />
      </SimpleGrid>
    </div>
  )
}

export default PaintCorrectionComponent;
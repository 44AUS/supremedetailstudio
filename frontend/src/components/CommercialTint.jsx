import React from 'react'
import PackageCard from './PackageCard';
import { SimpleGrid, Tabs } from '@mantine/core';
import styling from '../components/CeramicCoating/Ppf.module.css';

const CommercialTintComponent = () => {
  const stageOne = [
    'Available in Light, Medium, and Limo Shades',
    'No Heat Rejection', 
    'Deep Dyed Technology', 
    'Blocks 99% of harmful UV rays to help protect vehicle occupants as well as the Interior',
    'No signal interference (Will not block Cell Phone or GPS Signal)',
    'Manufacturer’s lifetime limited warranty', 
    'CarFax record update'
  ]
  
  const stageTwo = [
    'Available in Light, Medium, and Limo Shades',
    '50% Heat Rejection', 
    'Nano Carbon + Ceramic Technology', 
    'Blocks 99% of harmful UV rays to help protect vehicle occupants as well as the Interior',
    'No signal interference (Will not block Cell Phone or GPS Signal)',
    'Manufacturer’s lifetime limited warranty', 
    'CarFax record update'
  ]
  
  const stageThree = [
    'Available in Light, Medium, and Limo Shades',
    '80% Heat Rejection', 
    'Deep Dyed + Ceramic Technology', 
    'Blocks 99% of harmful UV rays to help protect vehicle occupants as well as the Interior',
    'No signal interference (Will not block Cell Phone or GPS Signal)',
    'Manufacturer’s lifetime limited warranty', 
    'CarFax record update'
  ]

  const apex = [
    'Available in Light, Medium, and Limo Shades',
    '95% Heat Rejection - top performer 🔥🔥🔥', 
    'Multi-Layer Super Ceramic Construction', 
    'Blocks 99% of harmful UV rays to help protect vehicle occupants as well as the Interior',
    'No signal interference (Will not block Cell Phone or GPS Signal)',
    'Manufacturer’s lifetime limited warranty', 
    'CarFax record update'
  ]

  return (
    <div>
      <Tabs variant="pills" defaultValue="security" classNames={styling} style={{ gap: '16px' }}>
      <Tabs.List grow>
        <Tabs.Tab
          value="full"
          
        >
          Security Film
        </Tabs.Tab>
        <Tabs.Tab
          value="solar"
        >
          Solar Film
        </Tabs.Tab>
        {/* <Tabs.Tab
          value="full-windshield"
          
        >
          Full Windshield
        </Tabs.Tab> */}
        <Tabs.Tab
          value="decorative"
          
        >
          Decorative Film
        </Tabs.Tab>
        {/* <Tabs.Tab
          value="sunroof"
          
        >
          Sunroof
        </Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="security" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div style={{ marginTop: '30px', }}>
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
        packageTitle="Pro Classic Tint"
        packageDuration="For privacy and style."
        included={stageOne}
        price="Starting at $225"
        bookingLink="tel:5024170690"
        />
        {/* <PackageCard
        packageTitle="Ceramic C2"
        packageDuration="For good heat rejection, privacy and style."
        included={stageTwo}
        price="$325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
        {/* <PackageCard
        packageTitle="Ceramic Pro Nano"
        packageDuration="This option has great heat rejection, advanced nanoceramic IR-blocking technology, and no sacrifices."
        included={stageThree}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        <PackageCard
        packageTitle="Apex Ultra"
        packageDuration="For our best heat rejection, advanced multi-layer nanoceramic IR-blocking technology, and no sacrifices."
        included={apex}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="front-two" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div style={{ marginTop: '30px', }}>
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
        packageTitle="Pro Classic Tint"
        packageDuration="For privacy and style."
        included={stageOne}
        price="Starting at $120"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        {/* <PackageCard
        packageTitle="Ceramic C2"
        packageDuration="For good heat rejection, privacy and style."
        included={stageTwo}
        price="$325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
        <PackageCard
        packageTitle="Ceramic Pro Nano"
        packageDuration="This option has great heat rejection, advanced nanoceramic IR-blocking technology, and no sacrifices."
        included={stageThree}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        <PackageCard
        packageTitle="Apex Ultra"
        packageDuration="For our best heat rejection, advanced multi-layer nanoceramic IR-blocking technology, and no sacrifices."
        included={apex}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="full-windshield" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div style={{ marginTop: '30px', }}>
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
        packageTitle="Pro Classic Tint"
        packageDuration="For privacy and style."
        included={stageOne}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        {/* <PackageCard
        packageTitle="Ceramic C2"
        packageDuration="For good heat rejection, privacy and style."
        included={stageTwo}
        price="$325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
        <PackageCard
        packageTitle="Ceramic Pro Nano"
        packageDuration="This option has great heat rejection, advanced nanoceramic IR-blocking technology, and no sacrifices."
        included={stageThree}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        <PackageCard
        packageTitle="Apex Ultra"
        packageDuration="For our best heat rejection, advanced multi-layer nanoceramic IR-blocking technology, and no sacrifices."
        included={apex}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="window-strip" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div style={{ marginTop: '30px', }}>
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
        packageTitle="Pro Classic Tint"
        packageDuration="For privacy and style."
        included={stageOne}
        price="Starting at $50"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        {/* <PackageCard
        packageTitle="Ceramic C2"
        packageDuration="For good heat rejection, privacy and style."
        included={stageTwo}
        price="$325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
        <PackageCard
        packageTitle="Ceramic Pro Nano"
        packageDuration="This option has great heat rejection, advanced nanoceramic IR-blocking technology, and no sacrifices."
        included={stageThree}
        price="Starting at $100"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        <PackageCard
        packageTitle="Apex Ultra"
        packageDuration="For our best heat rejection, advanced multi-layer nanoceramic IR-blocking technology, and no sacrifices."
        included={apex}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="sunroof" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div style={{ marginTop: '30px', }}>
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
        packageTitle="Pro Classic Tint"
        packageDuration="For privacy and style."
        included={stageOne}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        {/* <PackageCard
        packageTitle="Ceramic C2"
        packageDuration="For good heat rejection, privacy and style."
        included={stageTwo}
        price="$325"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        /> */}
        <PackageCard
        packageTitle="Ceramic Pro Nano"
        packageDuration="This option has great heat rejection, advanced nanoceramic IR-blocking technology, and no sacrifices."
        included={stageThree}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
        <PackageCard
        packageTitle="Apex Ultra"
        packageDuration="For our best heat rejection, advanced multi-layer nanoceramic IR-blocking technology, and no sacrifices."
        included={apex}
        price="CALL FOR PRICING"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/KPFUIkM7NOncFN6UCQoI"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      </Tabs>
    </div>
  )
}

export default CommercialTintComponent;
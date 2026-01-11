import React from 'react';
import { SimpleGrid, Tabs, Container, createStyles } from '@mantine/core';
import PackageCard from '../PackageCard';
import styling from './Ppf.module.css';

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

const CeramicTabs = () => {
  const { classes, theme } = useStyles();

  const levelOne = [
    'Clean wheels, wheel wells, and tires',
    'Complete wash',
    'Paint decontamination',
    'Decontaminate remaining impurities with clay-bar',
    '1 step paint correction (2 step paint correction add $200)',
    'Application of Ceramic Coating to all painted surfaces, headlights, taillights, trim, and wheel faces',
    'CarFax record update',
  ];

  const partialFront = [
    'Front bumper',
    'Partial hood',
    '1 Step Polishing (removes light swirls/scratches)',
    'Mirrors',
    'Partial front fenders',
  ]

  const fullFrontEnd = [
    'Everything from our Partial Front PPF package plus the following upgrades',
    'Full hood',
    'Full front fenders',
    'Headlights',
  ]

  const trackPackage = [
    'Everything from our Full Front End PPF package plus the following upgrades',
    'Rocker panels',
    'A-pillars',
  ]

  const fullBody = [
    'Everything from our Track Package plus the following upgrades',
    'Trunk',
    'Full rear fenders',
    'All doors',
    'Roof'
  ]

  const satinOrColor = [
    'Everything from our Full Body PPF package plus the following upgrades',
    'Your choice of our Satin or PPF Color Packages'
  ]

  return (
    <div>
      <Tabs variant="pills" defaultValue="sedan" classNames={styling} style={{ gap: '16px' }}>
      <Tabs.List grow>
        <Tabs.Tab
          value="sedan"
        >
          Sedan/Coupe
        </Tabs.Tab>
        <Tabs.Tab
          value="suv"
          
        >
          Small Size SUV/Crossover
        </Tabs.Tab>
        <Tabs.Tab
          value="truck"
          
        >
          Large Size SUV/Truck
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sedan" style={{ transition: 'opacity 1200ms ease 0s' }}>
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
        packageTitle="Quartz Coating"
        packageDuration="3 Years"
        included={levelOne}
        price="$650"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=DLx0jIV9pgi9UQwiNZdK&sku=33MqtDKkpkAGWz2B1wIo"
        />
                <PackageCard
        packageTitle="Quartz Pro 9h"
        packageDuration="5 Years"
        included={levelOne}
        price="$1,000"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
        <PackageCard
        packageTitle="Graphene Pro 10H & N1"
        packageDuration="10 Years"
        included={levelOne}
        price="$1,850"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="suv">
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
        packageTitle="Quartz Coating"
        packageDuration="3 Years"
        included={levelOne}
        price="$750"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=DLx0jIV9pgi9UQwiNZdK&sku=33MqtDKkpkAGWz2B1wIo"
        />
                <PackageCard
        packageTitle="Quartz Pro 9h"
        packageDuration="5 Years"
        included={levelOne}
        price="$1,100"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
        <PackageCard
        packageTitle="Graphene Pro 10H & N1"
        packageDuration="10 Years"
        included={levelOne}
        price="$1,950"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="truck">
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
        packageTitle="Quartz Coating"
        packageDuration="3 Years"
        included={levelOne}
        price="$850"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=DLx0jIV9pgi9UQwiNZdK&sku=33MqtDKkpkAGWz2B1wIo"
        />
                <PackageCard
        packageTitle="Quartz Pro 9h"
        packageDuration="5 Years"
        included={levelOne}
        price="$1,200"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
        <PackageCard
        packageTitle="Graphene Pro 10H & N1"
        packageDuration="10 Years"
        included={levelOne}
        price="$2,050"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/1gpKkNQfkhpYPNy1i0Mv?productServiceId=NZY15ptgN9zac5msR7up&sku=IAWw6fS4v6SdiLHeP7Jp"
        />
      </SimpleGrid>
      </div>
      </Tabs.Panel>
      

    </Tabs>
    </div>
  )
}

export default CeramicTabs;
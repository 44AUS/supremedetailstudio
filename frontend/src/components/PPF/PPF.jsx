import React from 'react';
import { Image, Tabs, Container, createStyles } from '@mantine/core';
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

const PPFComponent = () => {
  const { classes, theme } = useStyles();

  const partialFront = [
    'Front bumper',
    'Partial hood',
    'Headlights',
    'Mirrors',
    'Partial front fenders',
    '* Specific body part add-ons are also available and easily customizable.'
  ]

  const fullFrontEnd = [
    'Everything from our Partial Front PPF package plus the following upgrades',
    'Full hood',
    'Full front fenders',
    '* Specific body part add-ons are also available and easily customizable.'
  ]

  const trackPackage = [
    'Everything from our Full Front End PPF package plus the following upgrades',
    'Rocker panels',
    'A-pillars',
    '* Specific body part add-ons are also available and easily customizable.'
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
      <Tabs variant="pills" defaultValue="partial" classNames={styling} style={{ gap: '16px' }}>
      <Tabs.List grow>
        <Tabs.Tab
          value="partial"
        >
          Partial Front
        </Tabs.Tab>
        <Tabs.Tab
          value="frontend"
          
        >
          Full Front End
        </Tabs.Tab>
        <Tabs.Tab
          value="track"
          
        >
          Track Package
        </Tabs.Tab>
        <Tabs.Tab
          value="fullbody"
          
        >
          Full Body
        </Tabs.Tab>
        {/* <Tabs.Tab
          value="colored"
          
        >
          Satin Or Colored PPF
        </Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="partial" style={{ transition: 'opacity 1200ms ease 0s' }}>
      <div className='tab-layout'>
      <div>
        <Image src={partialFrontPpf} style={{ width: '100%', padding: '3rem', margin: 'auto', animation: 'fadein 1s', }} />
        </div>
        <div>
      <PackageCard
        packageTitle="Partial Front"
        packageDuration="3 - 4 Days"
        included={partialFront}
        price="Starting at $1,450"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="frontend">
      <div className='tab-layout'>
      <div>
        <Image src={fullFrontPpf} style={{ width: '100%', padding: '3rem', margin: 'auto', animation: 'fadein 1s', }} />
        </div>
        <div>
      <PackageCard
        packageTitle="Full Front End"
        packageDuration="3 - 4 Days"
        included={fullFrontEnd}
        price="Starting at $1,850"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        </div>
      </div>
      </Tabs.Panel>

      <Tabs.Panel value="track">
      <div className='tab-layout'>
      <div>
        <Image src={trackPpf} style={{ width: '100%', padding: '3rem', margin: 'auto', animation: 'fadein 1s', }} />
        </div>
        <div>
      <PackageCard
        packageTitle="Track Package"
        packageDuration="3 - 4 Days"
        included={trackPackage}
        price="Starting at $2,750"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="fullbody">
      <div className='tab-layout'>
      <div>
        <Image src={fullPpf} style={{ width: '100%', padding: '3rem', margin: 'auto', animation: 'fadein 1s', }} />
        </div>
        <div>
      <PackageCard
        packageTitle="Full Body In Gloss Or Satin PPF"
        packageDuration="4 - 5 Days"
        included={fullBody}
        price="Starting at $5,500"
        bookingLink="https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/pOUCf7sLZ7O0rn1N9gsl"
        />
        </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="colored">
      <div className='tab-layout'>
      <div>
        <Image src={fullPpf} style={{ width: '100%', padding: '3rem', margin: 'auto', animation: 'fadein 1s', }} />
        </div>
        <div>
      <PackageCard
        packageTitle="Full Body In Satin or Colored PPF"
        packageDuration="4 - 5 Days"
        included={satinOrColor}
        price="Call us for a quote"
        bookingLink="/contact-us"
        />
        </div>
        </div>
      </Tabs.Panel>

    </Tabs>
    </div>
  )
}

export default PPFComponent;
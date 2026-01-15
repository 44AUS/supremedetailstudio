import React from 'react';
import { SimpleGrid, createStyles } from '@mantine/core';
import AddOnCard from './AddOnCard';

const useStyles = createStyles((theme) => ({
  wrapper: {}
}));

const AddOnServices = () => {
  const { classes } = useStyles();

  return (
    <>
    <div className={classes.wrapper}>
        <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: '62rem', cols: 4, spacing: 'md' },
          { maxWidth: '48rem', cols: 1, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
        >
          {/* <AddOnCard titleProp='Chrome Polish' priceProp='$25' /> */}
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=9IDQdZ2ayo7M9YDiJ0XX&sku=UiXYUp417XUEBhUd4l3U' titleProp='Engine Bay Cleaning' descProp='Engine bay is deep cleaned and dressed.' priceProp='$65' />
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=cmjxnchQBoZ0xBdWZ3TP&sku=ELXn6w6W4jDspYvBgssI' titleProp='Headliner Cleaning' descProp='Headliner area is steam cleaned.' priceProp='$50' />
          <AddOnCard linkProp='' titleProp='Interior Ceramic Coating' priceProp='$250' />
          <AddOnCard linkPro='' titleProp='Leather Ceramic Coating' priceProp='$175' />
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=ead0TaujBU25S4vTPupE&sku=STUqg6wKdqw8zNrxnM7D' titleProp='Leather Clean & Treatment' descProp='Leather is deep cleaned and conditioned/protected.' priceProp='$50' />
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=Hl5ytqJknnCDFEr9HFu9&sku=OXdJK8QwRKX6EQc2H65v' titleProp='Hot Water Extraction' descProp='Carpets and seats are shampooed and extracted with hot water extraction service.' priceProp='$100' />
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=B8hgT2mSPTyPx2nonmKM&sku=9Of30e3tmX9RdSGG8pHG' titleProp='Pet Hair Removal' descProp='Removal of excessive pet hair.' priceProp='$100' />
          {/* <AddOnCard titleProp='Black Trim Restore & Protect' priceProp='$15' /> */}
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=e6UmZy4E6B2KYgCP6Mah&sku=irC3RkUFCvxiMjoUw9ZA' titleProp='Headlight Restoration' descProp='Foggy headlights can be dangerous driving at night. This multi-step restoration process rejuvenates headlights renewing the "face" of your vehicle and brings back the original brightness to your headlight beams.' priceProp='$100' />
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/B4AobfUQvbpHhjyeyRY2?productServiceId=6SsSWHQBv6iNYu2plHv8&sku=EWyXfmnF00JuiiZZi1qV' titleProp='Ozone Odor Treatment' descProp='Remove stubborn odors from your vehicle with our Ozone Treatment Service. Ozone kills Bacteria, Odors, Cigarette Smoke and more.' priceProp='$75' />
          {/* <AddOnCard titleProp='Bio-Bombs Odor Elimination' priceProp='$50' /> */}
          <AddOnCard linkProp='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw/ESiDRkEcgVAtHaaJoMo4?productServiceId=l3xz0l6dDojO6KtGzhHm&sku=jqaafCFu5nbvi8jx1fQ6' titleProp='Biohazards Fee' descProp='Biohazards Fee, any body fluids.' priceProp='$100' />
        </SimpleGrid>
        </div>
    </>
  )
}

export default AddOnServices;
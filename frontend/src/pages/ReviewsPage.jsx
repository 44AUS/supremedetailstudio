import React from 'react';
import ReviewsNoTitle from '../components/ReviewsNoTitle';
import ReviewsHero from '../components/Heroes/ReviewsHero';
import WhyUs from '../components/BenefitsAndImportance/WhyUs';
import { Helmet } from 'react-helmet';
import Map from '../components/Map';

const ReviewsPage = () => {

  return (
    <>
    <Helmet>
      <title>Detailing Customer Reviews Marietta, GA | Supreme Detail Studio</title>
      <meta name='title' content='Detailing Customer Reviews Marietta, GA | Supreme Detail Studio' />
      <meta name='description' content='Supreme Detail Studio is a high-performance ceramic coating, PPF, and Window Tint installer in Marietta, Kentucky. Read our reviews and call (502) 417-0690.' />
      <meta name='keywords' content='louisville ky ppf, supreme detail studio, louisville mobile car detailing, louisville window tinting, louisville paint protection film, stek louisville, louisville paint correction, louisville mobile detail new albany,' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content='Detailing Customer Reviews Marietta, GA | Supreme Detail Studio' />
      <meta property="og:description" content='Supreme Detail Studio is a high-performance ceramic coating, PPF, and Window Tint installer in Marietta, Kentucky. Read our reviews and call (502) 417-0690.' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <ReviewsHero />
    {/* <CertifiedInstaller /> */}
    <ReviewsNoTitle />
    <WhyUs />
    <Map />
    </>
  )
}

export default ReviewsPage;
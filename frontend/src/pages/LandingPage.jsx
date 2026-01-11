import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Heroes/Hero';
// import About from './About';
import Reviews from '../components/Reviews';
import WhyUs from '../components/BenefitsAndImportance/WhyUs';
import Services from '../components/Services/Services';
import Map from '../components/Map';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import GalleryMasonry from '../components/GalleryMasonry';
import BestDetailBiz from '../components/BenefitsAndImportance/BestAutoDetailBiz';
import TintYourRide from '../components/BenefitsAndImportance/TintYourRide';

const Landing = () => {
  return (
    <>
    <Helmet>
      <title>Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint</title>
      <meta name='title' content={`Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint`} />
      <meta name='description' content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Contact (502) 417-0690 for estimates. Jefferson County, KY, Oldham County, KY, Middletown, KY, Jeffersontown, KY.' />
      <meta name='keywords' content='supreme detail studio, louisville car detail, mobile detailing, louisville ceramic coating, louisville mobile detail, ceramic coating, louisville paint correction, louisville paint protection, window tint in louisville' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
      
      <meta property="og:title" content={`Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint`} />
      <meta property="og:description" content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Contact (502) 417-0690 for estimates. Jefferson County, KY, Oldham County, KY, Middletown, KY, Jeffersontown, KY.' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />
    </Helmet>
    <Hero />
    <Services />
    <BestDetailBiz />
    <CertifiedInstaller />
    <Reviews />
    <WhyUs />
    <TintYourRide />
    <GalleryMasonry />
    <Connecting />
    <Map />
    </>
  )
}

export default Landing;
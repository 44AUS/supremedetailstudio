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
  // Homepage Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio",
    "description": "Marietta GA's premier auto detailing studio offering paint protection film, ceramic coating, window tinting, and professional detailing services. Serving Cobb County, Atlanta, Kennesaw, and surrounding areas.",
    "url": "https://supremedetailstudio.com",
    "telephone": "+1-502-417-0690",
    "image": "https://supremedetailstudio.com/preview.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marietta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8836625",
      "longitude": "-84.409205"
    },
    "areaServed": [
      { "@type": "City", "name": "Marietta", "addressRegion": "GA" },
      { "@type": "City", "name": "Atlanta", "addressRegion": "GA" },
      { "@type": "City", "name": "Kennesaw", "addressRegion": "GA" },
      { "@type": "City", "name": "Smyrna", "addressRegion": "GA" },
      { "@type": "City", "name": "Sandy Springs", "addressRegion": "GA" },
      { "@type": "City", "name": "Roswell", "addressRegion": "GA" },
      { "@type": "City", "name": "Alpharetta", "addressRegion": "GA" },
      { "@type": "City", "name": "Acworth", "addressRegion": "GA" },
      { "@type": "City", "name": "Woodstock", "addressRegion": "GA" },
      { "@type": "AdministrativeArea", "name": "Cobb County", "addressRegion": "GA" },
      { "@type": "AdministrativeArea", "name": "Fulton County", "addressRegion": "GA" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://www.google.com/maps/place/Supreme+Detail+Studio/@33.8836625,-84.409205",
      "https://www.facebook.com/supremedetailstudio",
      "https://www.instagram.com/supremedetailstudio"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Detailing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film (PPF)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Correction" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Detailing" } }
      ]
    }
  };

  return (
    <>
    <Helmet>
      <title>Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Supreme Detail Studio</title>
      <meta name='title' content="Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Supreme Detail Studio" />
      <meta name='description' content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Serving Cobb County, Atlanta, Kennesaw, Smyrna & Sandy Springs. Call (502) 417-0690 for estimates.' />
      <meta name='keywords' content='supreme detail studio, marietta car detail, mobile detailing marietta, marietta ceramic coating, ceramic coating near me, ppf near me, window tint marietta, paint protection film marietta ga, auto detailing atlanta ga, kennesaw detailing, smyrna car detailing, cobb county auto detailing' />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://supremedetailstudio.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://supremedetailstudio.com/" />
      <meta property="og:title" content="Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Supreme Detail Studio" />
      <meta property="og:description" content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Serving Cobb County, Atlanta, Kennesaw, Smyrna & Sandy Springs.' />
      <meta property="og:image" content='https://supremedetailstudio.com/preview.png' />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://supremedetailstudio.com/" />
      <meta name="twitter:title" content="Marietta GA's Top PPF & Ceramic Coating Shop | Supreme Detail Studio" />
      <meta name="twitter:description" content='Supreme Detail Studio - Marietta GA Premier Auto Detailing. PPF, Ceramic Coating, Window Tint. Call (502) 417-0690!' />
      <meta name="twitter:image" content='https://supremedetailstudio.com/preview.png' />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="US-GA" />
      <meta name="geo.placename" content="Marietta" />
      <meta name="geo.position" content="33.8836625;-84.409205" />
      <meta name="ICBM" content="33.8836625, -84.409205" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
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
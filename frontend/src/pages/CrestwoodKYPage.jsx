import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AtlantaHero from '../components/Heroes/AtlantaHero';
import CertifiedInstaller from '../components/BenefitsAndImportance/CertifiedInstaller';
import curingLamp from '../assets/images/details/curing-lamp.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '15px',
    paddingBottom: 80,
    position: 'relative',
  },
  img: {
    borderRadius: '20px',
    width: '100%',
    height: 'auto',
  },
  h1: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 24,
      textAlign: 'center',
    },
  },
  h1Center: {
    marginTop: '15px',
    marginBottom: '15px',
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    animation: 'fadein 1s',
    textAlign: 'center',
    '@media (max-width: 520px)': {
      fontSize: 24,
    },
  },
  h2: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '28px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 700,
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: 22,
      textAlign: 'center',
    },
  },
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#e80200',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    fontWeight: 500,
    textTransform: 'uppercase',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      textAlign: 'center',
    },
  },
  WhyDesc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      textAlign: 'center',
    },
  },
  servicesList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    lineHeight: 2.2,
  },
  buttonContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '18px 40px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)',
    '&:hover': {
      backgroundColor: '#ff1a1a',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(232, 2, 0, 0.6)',
    },
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '16px 38px',
    textDecoration: 'none',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#fff',
      transform: 'translateY(-3px)',
    },
  },
}));

const AtlantaGAPage = () => {
  const { classes } = useStyles();

  // Structured Data for Local Business SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Atlanta, GA",
    "description": "Premier auto detailing studio in Atlanta, GA. Professional ceramic coating, paint protection film (PPF), window tinting, and paint correction services for luxury and exotic vehicles.",
    "url": "https://supremedetailstudio.com/service-areas/atlanta-ga",
    "telephone": "+1-502-417-0690",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.7490",
      "longitude": "-84.3880"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Atlanta",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Buckhead",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Midtown Atlanta",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Sandy Springs",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Marietta",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Decatur",
        "addressRegion": "GA"
      }
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
    "priceRange": "$$$",
    "image": "https://supremedetailstudio.com/preview.png",
    "sameAs": [
      "https://www.facebook.com/supremedetailstudio",
      "https://www.instagram.com/supremedetailstudio"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Detailing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Detailing in Atlanta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ceramic Coating in Atlanta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Protection Film in Atlanta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Correction in Atlanta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Tinting in Atlanta, GA"
          }
        }
      ]
    }
  };

  // FAQ Structured Data for Atlanta
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best auto detailing service in Atlanta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Supreme Detail Studio is Atlanta's premier auto detailing service, specializing in luxury and exotic vehicles. We offer comprehensive detailing packages, ceramic coating, paint protection film, and more using professional-grade equipment and products."
        }
      },
      {
        "@type": "Question",
        "name": "How much does professional car detailing cost in Atlanta, GA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional car detailing prices in Atlanta vary based on vehicle size and services selected. Contact Supreme Detail Studio at (502) 417-0690 for a personalized quote tailored to your vehicle's needs."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer mobile detailing in Atlanta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Supreme Detail Studio offers mobile detailing services throughout the Atlanta metro area, including Buckhead, Midtown, Sandy Springs, Marietta, and surrounding communities."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Auto Detailing Atlanta GA | Ceramic Coating, PPF & Paint Correction | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Atlanta GA | Ceramic Coating, PPF & Paint Correction | Supreme Detail Studio" />
        <meta name="description" content="Atlanta's premier auto detailing studio. Professional ceramic coating, paint protection film (PPF), paint correction & window tinting for luxury vehicles. Serving Buckhead, Midtown & Metro Atlanta. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing atlanta ga, car detailing atlanta, ceramic coating atlanta ga, paint protection film atlanta, ppf atlanta ga, paint correction atlanta, window tinting atlanta ga, luxury car detailing atlanta, mobile detailing atlanta, supreme detail studio atlanta" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/atlanta-ga" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/atlanta-ga" />
        <meta property="og:title" content="Auto Detailing Atlanta GA | Ceramic Coating, PPF & Paint Correction | Supreme Detail Studio" />
        <meta property="og:description" content="Atlanta's premier auto detailing studio. Professional ceramic coating, PPF, paint correction & window tinting for luxury vehicles. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://supremedetailstudio.com/service-areas/atlanta-ga" />
        <meta name="twitter:title" content="Auto Detailing Atlanta GA | Luxury Car Detailing" />
        <meta name="twitter:description" content="Atlanta's premier auto detailing studio. Ceramic coating, PPF, paint correction. Call (502) 417-0690!" />
        <meta name="twitter:image" content="https://supremedetailstudio.com/preview.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Atlanta" />
        <meta name="geo.position" content="33.7490;-84.3880" />
        <meta name="ICBM" content="33.7490, -84.3880" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <AtlantaHero />
      
      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
            {/* Next Generation Equipment Section */}
            <SimpleGrid
              cols={2}
              spacing="xl"
              breakpoints={[
                { maxWidth: 980, cols: 2, spacing: 'md' },
                { maxWidth: 755, cols: 1, spacing: 'sm' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
              ]}
            >
              <div>
                <img 
                  src={curingLamp} 
                  alt="Professional infrared curing lamp for ceramic coating in Atlanta, GA" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
              <div>
                <Title className={classes.desc}>ATLANTA'S PREMIER DETAILING STUDIO</Title>
                <Title order={1} className={classes.h1}>Next Generation Auto Detailing Equipment</Title>
                <Text className={classes.WhyDesc}>
                  As an innovative <strong>auto detailing studio in Atlanta, GA</strong>, Supreme Detail Studio takes car care to the next level. We utilize the finest professional equipment including:
                </Text>
                <ul className={classes.servicesList}>
                  <li>Digital paint thickness gauges for precise assessment</li>
                  <li>Infrared thermal curing lamps for optimal coating cure</li>
                  <li>Digital microscope systems for paint inspection</li>
                  <li>Professional pneumatic and DA polishing machines</li>
                  <li>Automotive-grade lighting for defect detection</li>
                  <li>Climate-controlled clean room environment</li>
                </ul>
                <Text className={classes.WhyDesc}>
                  No imperfection goes undetected. This ensures our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>Atlanta auto detailing</Link> work is flawless prior to delivery.
                </Text>
              </div>
            </SimpleGrid>

            {/* Peace of Mind Section */}
            <section>
              <SimpleGrid
                cols={2}
                spacing="xl"
                breakpoints={[
                  { maxWidth: 980, cols: 2, spacing: 'md' },
                  { maxWidth: 755, cols: 1, spacing: 'sm' },
                  { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
                style={{ marginTop: '60px' }}
              >
                <div>
                  <Title className={classes.desc}>OUR COMMITMENT TO EXCELLENCE</Title>
                  <Title order={2} className={classes.h2}>Peace of Mind with Every Detail</Title>
                  <Text className={classes.WhyDesc}>
                    We take great pride in each vehicle we service at our <strong>Atlanta detailing studio</strong>. We work on only a select few vehicles at a time so each client's car receives the undivided attention it deserves.
                  </Text>
                  <Text className={classes.WhyDesc}>
                    Supreme Detail Studio is <strong>fully insured, licensed, and certified</strong>. Our studio is monitored 24/7 for your peace of mind.
                  </Text>
                  <Text className={classes.WhyDesc}>
                    <strong>Our Atlanta auto detailing services include:</strong>
                  </Text>
                  <ul className={classes.servicesList}>
                    <li><Link to="/services/detailing" style={{ color: '#FFF' }}>Full Interior & Exterior Detailing</Link></li>
                    <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic Coating Protection</Link></li>
                    <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint Protection Film (PPF/Clear Bra)</Link></li>
                    <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction & Swirl Removal</Link></li>
                    <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Professional Window Tinting</Link></li>
                    <li><Link to="/services/headlight-restoration" style={{ color: '#FFF' }}>Headlight Restoration</Link></li>
                  </ul>
                </div>
                <div>
                  <img 
                    src={TeslaInterior} 
                    alt="Tesla interior detailing Atlanta - premium leather care and cleaning" 
                    className={classes.img}
                    loading="lazy"
                  />
                </div>
              </SimpleGrid>
            </section>

            {/* Why Choose Us Section */}
            <section>
              <Title order={2} className={classes.h1Center}>Why Atlanta Vehicle Owners Choose Supreme Detail Studio</Title>
              <SimpleGrid
                cols={2}
                spacing="xl"
                breakpoints={[
                  { maxWidth: 980, cols: 2, spacing: 'md' },
                  { maxWidth: 755, cols: 1, spacing: 'sm' },
                  { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
                style={{ marginTop: '30px' }}
              >
                <div>
                  <img 
                    src={TeslaPlaid} 
                    alt="Tesla paint correction service in Atlanta GA - swirl removal and paint enhancement" 
                    className={classes.img}
                    loading="lazy"
                  />
                </div>
                <div>
                  <Text className={classes.WhyDesc}>
                    <strong>Atlanta's discerning vehicle owners</strong> trust Supreme Detail Studio for their luxury cars, exotic vehicles, and daily drivers. Here's why:
                  </Text>
                  <ul className={classes.servicesList}>
                    <li><strong>Certified Professionals</strong> – ONYX & STEK certified installers</li>
                    <li><strong>Premium Products</strong> – Only professional-grade coatings and films</li>
                    <li><strong>Attention to Detail</strong> – Every vehicle treated like our own</li>
                    <li><strong>State-of-the-Art Facility</strong> – Climate-controlled clean room</li>
                    <li><strong>Comprehensive Services</strong> – One-stop shop for all detailing needs</li>
                    <li><strong>Customer Satisfaction</strong> – 5-star reviews from Atlanta customers</li>
                  </ul>
                  <div className={classes.buttonContainer}>
                    <Link 
                      to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={classes.primaryButton}
                      aria-label="Book auto detailing in Atlanta GA"
                    >
                      Book Appointment
                    </Link>
                    <Link 
                      to="tel:5024170690" 
                      className={classes.secondaryButton}
                      aria-label="Call Supreme Detail Studio Atlanta"
                    >
                      Call (502) 417-0690
                    </Link>
                  </div>
                </div>
              </SimpleGrid>
            </section>

            {/* Service Areas Section */}
            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Atlanta & Metro Atlanta Areas</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio proudly provides professional auto detailing services throughout the Atlanta metropolitan area:
              </Text>
              <SimpleGrid
                cols={4}
                spacing="lg"
                breakpoints={[
                  { maxWidth: 980, cols: 3, spacing: 'md' },
                  { maxWidth: 755, cols: 2, spacing: 'sm' },
                  { maxWidth: 600, cols: 2, spacing: 'sm' },
                ]}
                style={{ marginTop: '20px', textAlign: 'center' }}
              >
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Buckhead, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Midtown Atlanta</span>
                <Link to="/service-areas/sandy-springs" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Sandy Springs, GA</Link>
                <Link to="/service-areas/marietta-ga" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <Link to="/service-areas/kennesaw-ga" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Decatur, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Dunwoody, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Alpharetta, GA</span>
              </SimpleGrid>
            </section>
          </article>
        </Container>

        <CertifiedInstaller />
        <Connecting />
        <Services />
      </main>
    </>
  );
};

export default AtlantaGAPage;

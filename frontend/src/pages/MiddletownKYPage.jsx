import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SandySpringsHero from '../components/Heroes/MiddletownKYHero';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';
import BMWSteeringWheel from '../assets/images/details/bmw-steering-wheel.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
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
      textAlign: 'center',
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
  WhyDesc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      textAlign: 'center',
    },
  },
  ulTitle: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#e80200',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: 1.8,
    animation: 'fadein 1s',
    marginTop: '20px',
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
    lineHeight: 2,
    marginBottom: '20px',
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

const SandySpringsGAPage = () => {
  const { classes } = useStyles();

  // Structured Data for Local Business SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Sandy Springs, GA",
    "description": "Professional auto detailing, ceramic coating, paint protection film, and window tinting services in Sandy Springs, GA. Serving North Atlanta and Fulton County.",
    "url": "https://supremedetailstudio.com/service-areas/sandy-springs",
    "telephone": "+1-502-417-0690",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sandy Springs",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.9304",
      "longitude": "-84.3733"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Sandy Springs",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Atlanta",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Dunwoody",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Roswell",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Buckhead",
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
    "priceRange": "$$",
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
            "name": "Auto Detailing in Sandy Springs, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ceramic Coating in Sandy Springs, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Protection Film in Sandy Springs, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Tinting in Sandy Springs, GA"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Auto Detailing Sandy Springs GA | Car Detailing, Ceramic Coating & PPF | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Sandy Springs GA | Car Detailing, Ceramic Coating & PPF | Supreme Detail Studio" />
        <meta name="description" content="Premium auto detailing in Sandy Springs, GA. Professional car detailing, ceramic coating, paint protection film & window tinting for luxury vehicles. Serving North Atlanta. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing sandy springs ga, car detailing sandy springs, ceramic coating sandy springs ga, ppf sandy springs, paint protection film sandy springs ga, window tinting sandy springs, mobile detailing sandy springs, luxury car detailing atlanta, supreme detail studio sandy springs" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/sandy-springs" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/sandy-springs" />
        <meta property="og:title" content="Auto Detailing Sandy Springs GA | Ceramic Coating & PPF | Supreme Detail Studio" />
        <meta property="og:description" content="Premium auto detailing in Sandy Springs, GA. Professional ceramic coating, PPF & window tinting for luxury vehicles. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://supremedetailstudio.com/service-areas/sandy-springs" />
        <meta name="twitter:title" content="Auto Detailing Sandy Springs GA | Luxury Car Detailing" />
        <meta name="twitter:description" content="Premium auto detailing in Sandy Springs, GA. Professional ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta name="twitter:image" content="https://supremedetailstudio.com/preview.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Sandy Springs" />
        <meta name="geo.position" content="33.9304;-84.3733" />
        <meta name="ICBM" content="33.9304, -84.3733" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <SandySpringsHero />
      
      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
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
                <Text className={classes.WhyDesc}>
                  <strong>Sports cars, high-end vehicles, and luxury automobiles</strong> are significant investments, and it makes sense to protect them with the best care possible. When it comes to detailing luxury vehicles in Sandy Springs, GA, Supreme Detail Studio treats every car like our own.
                </Text>
                <Text className={classes.WhyDesc}>
                  Cars are our passion, and you'll see it in every detail. The meticulous attention we pay to each vehicle makes us one of the <strong>best auto detailing companies in Sandy Springs, GA</strong>. We're proud to serve Sandy Springs, Buckhead, Dunwoody, and the greater North Atlanta area.
                </Text>
                <Text className={classes.WhyDesc}>
                  Whether you drive a Tesla, BMW, Mercedes, Porsche, or any luxury vehicle, our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>professional detailing services</Link> will exceed your expectations.
                </Text>
              </div>
              <div>
                <img 
                  src={BMWExterior} 
                  alt="BMW 760i professional detailing in Sandy Springs, GA - Supreme Detail Studio" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
            </SimpleGrid>

            <section>
              <Title order={2} className={classes.h1}>Expert Car Detailers in Sandy Springs, GA</Title>
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
                    src={BMWSteeringWheel} 
                    alt="BMW interior detailing Sandy Springs - steering wheel and dashboard cleaning" 
                    className={classes.img}
                    loading="lazy"
                  />
                </div>
                <div>
                  <Text className={classes.WhyDesc}>
                    Want your car to look showroom-ready? Our <strong>exterior detailing services in Sandy Springs, GA</strong> will give you the head-turning results you've always wanted. We provide top-quality auto detailing to make your car look new from the inside out.
                  </Text>
                  <Text className={classes.WhyDesc}>
                    Enhance your detail with premium add-ons like <Link to="/services/paint-correction" style={{ textDecoration: 'underline', color: '#FFF' }}>paint correction</Link>, <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline', color: '#e80200' }}>ceramic coating</Link>, and <Link to="/services/paint-protection-film" style={{ textDecoration: 'underline', color: '#e80200' }}>paint protection film</Link> for the ultimate protection.
                  </Text>
                  
                  <Text className={classes.ulTitle}>EXTERIOR CAR DETAILING</Text>
                  <ul className={classes.servicesList}>
                    <li>Hand wash and dry with premium products</li>
                    <li>Clay bar paint decontamination</li>
                    <li>Machine polishing for swirl removal</li>
                    <li>Paint sealant or carnauba wax application</li>
                    <li>Wheel and tire detailing</li>
                    <li>Trim restoration</li>
                  </ul>
                  
                  <Text className={classes.ulTitle}>INTERIOR CAR DETAILING</Text>
                  <ul className={classes.servicesList}>
                    <li>Full interior vacuuming</li>
                    <li>Leather cleaning and conditioning</li>
                    <li>Steam cleaning and sanitization</li>
                    <li>Glass cleaning (interior and exterior)</li>
                    <li>Dashboard and trim protection</li>
                    <li>Odor elimination</li>
                  </ul>
                </div>
              </SimpleGrid>
            </section>

            <section>
              <Title order={2} className={classes.h1}>Why Choose Supreme Detail Studio in Sandy Springs?</Title>
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
                  <Text className={classes.WhyDesc}>
                    <strong>Sandy Springs residents trust Supreme Detail Studio</strong> because we deliver exceptional results with every vehicle. Our certified technicians use only professional-grade products and techniques to ensure your car receives the best care possible.
                  </Text>
                  <ul className={classes.servicesList}>
                    <li><strong>Certified Installers</strong> – ONYX & STEK certified professionals</li>
                    <li><strong>Premium Products</strong> – Industry-leading ceramic coatings and PPF</li>
                    <li><strong>Attention to Detail</strong> – We treat every car like it's our own</li>
                    <li><strong>Convenient Location</strong> – Serving all of North Atlanta</li>
                    <li><strong>Satisfaction Guaranteed</strong> – Your happiness is our priority</li>
                  </ul>
                  <div className={classes.buttonContainer}>
                    <Link 
                      to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={classes.primaryButton}
                      aria-label="Book auto detailing in Sandy Springs GA"
                    >
                      Book Appointment
                    </Link>
                    <Link 
                      to="tel:5024170690" 
                      className={classes.secondaryButton}
                      aria-label="Call Supreme Detail Studio"
                    >
                      Call (502) 417-0690
                    </Link>
                  </div>
                </div>
                <div>
                  <img 
                    src={TeslaInterior} 
                    alt="Tesla interior detailing in Sandy Springs GA - premium leather care" 
                    className={classes.img}
                    loading="lazy"
                  />
                </div>
              </SimpleGrid>
            </section>

            <section>
              <Title order={2} className={classes.h1}>Serving Sandy Springs & Surrounding Areas</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio proudly provides auto detailing services to Sandy Springs and the greater Atlanta metro area:
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
                <Link to="/service-areas/atlanta-ga" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Atlanta, GA</Link>
                <Link to="/service-areas/marietta-ga" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <Link to="/service-areas/kennesaw-ga" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Buckhead, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Dunwoody, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Roswell, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Alpharetta, GA</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Brookhaven, GA</span>
              </SimpleGrid>
            </section>
          </article>
        </Container>

        <Connecting />
        <Services />
      </main>
    </>
  );
};

export default SandySpringsGAPage;

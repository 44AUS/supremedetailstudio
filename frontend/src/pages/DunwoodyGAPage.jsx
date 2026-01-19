import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import curingLamp from '../assets/images/details/curing-lamp.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: '15px', paddingBottom: 80, position: 'relative' },
  heroWrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${BMWExterior})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: { paddingTop: '100px', paddingBottom: '100px' },
  },
  heroTitle: { fontFamily: "'Oswald', sans-serif", fontSize: '58px', color: '#FFF', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px', [theme.fn.smallerThan('md')]: { fontSize: '32px', padding: '0 15px' } },
  heroSubtitle: { fontFamily: "'Montserrat', sans-serif", fontSize: '14px', letterSpacing: '4px', color: '#e80200', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' },
  img: { borderRadius: '20px', width: '100%', height: 'auto' },
  h1: { marginTop: 0, fontFamily: 'SceneProUltBlkIt', color: '#fff', fontSize: '32px', textTransform: 'uppercase', lineHeight: 1.2, fontWeight: 800, '@media (max-width: 520px)': { fontSize: 24, textAlign: 'center' } },
  h2: { marginTop: 0, fontFamily: 'SceneProUltBlkIt', color: '#fff', fontSize: '28px', textTransform: 'uppercase', lineHeight: 1.2, fontWeight: 700, '@media (max-width: 520px)': { fontSize: 22, textAlign: 'center' } },
  h1Center: { marginTop: '15px', marginBottom: '15px', fontFamily: 'SceneProUltBlkIt', color: '#fff', fontSize: '32px', textTransform: 'uppercase', textAlign: 'center', '@media (max-width: 520px)': { fontSize: 24 } },
  WhyDesc: { fontFamily: "'Montserrat', sans-serif", color: '#fff', fontSize: '15px', lineHeight: 1.8, fontWeight: 500, marginTop: '1.25rem', marginBottom: '1.25rem', '@media (max-width: 520px)': { textAlign: 'center' } },
  servicesList: { listStyle: 'disc', paddingLeft: '20px', color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize: '15px', lineHeight: 2 },
  buttonContainer: { marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  primaryButton: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e80200', color: '#fff', fontFamily: "'Oswald', sans-serif", fontSize: '15px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none', borderRadius: '4px', fontWeight: 500, transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)', '&:hover': { backgroundColor: '#ff1a1a', transform: 'translateY(-3px)' } },
  secondaryButton: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: '#fff', fontFamily: "'Oswald', sans-serif", fontSize: '15px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 38px', textDecoration: 'none', border: '2px solid rgba(255, 255, 255, 0.8)', borderRadius: '4px', fontWeight: 500, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', transform: 'translateY(-3px)' } },
}));

const DunwoodyGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Dunwoody, GA",
    "description": "Premium auto detailing, ceramic coating, paint protection film, and window tinting services in Dunwoody, GA. Serving Perimeter area and North Atlanta.",
    "url": "https://supremedetailstudio.com/service-areas/dunwoody-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Dunwoody", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "33.9462", "longitude": "-84.3346" },
    "areaServed": [
      { "@type": "City", "name": "Dunwoody", "addressRegion": "GA" },
      { "@type": "City", "name": "Sandy Springs", "addressRegion": "GA" },
      { "@type": "City", "name": "Brookhaven", "addressRegion": "GA" },
      { "@type": "City", "name": "Chamblee", "addressRegion": "GA" },
      { "@type": "City", "name": "Doraville", "addressRegion": "GA" }
    ],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "16:00" }
    ],
    "priceRange": "$$$",
    "image": "https://supremedetailstudio.com/preview.png",
    "sameAs": ["https://www.google.com/maps/place/Supreme+Detail+Studio/@33.8836625,-84.409205", "https://www.facebook.com/supremedetailstudio"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Detailing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Dunwoody, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Dunwoody, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Dunwoody, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Dunwoody, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the best auto detailing service near Perimeter Mall?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio serves Dunwoody and the Perimeter area with premium auto detailing, ceramic coating, and PPF services. We specialize in luxury vehicles and offer convenient mobile detailing." } },
      { "@type": "Question", "name": "Do you offer mobile detailing in Dunwoody?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We provide mobile detailing services throughout Dunwoody, Sandy Springs, Brookhaven, and the greater Perimeter area. Call (502) 417-0690 to schedule." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Auto Detailing Dunwoody GA | Ceramic Coating & PPF Near Perimeter | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Dunwoody GA | Ceramic Coating & PPF Near Perimeter | Supreme Detail Studio" />
        <meta name="description" content="Premium auto detailing in Dunwoody, GA near Perimeter Mall. Professional ceramic coating, paint protection film, window tinting & paint correction. Serving DeKalb County. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing dunwoody ga, car detailing dunwoody, ceramic coating dunwoody ga, ppf dunwoody, paint protection film dunwoody ga, window tinting dunwoody, perimeter mall detailing, brookhaven auto detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/dunwoody-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/dunwoody-ga" />
        <meta property="og:title" content="Auto Detailing Dunwoody GA | Near Perimeter Mall" />
        <meta property="og:description" content="Premium auto detailing in Dunwoody, GA. Ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auto Detailing Dunwoody GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Dunwoody" />
        <meta name="geo.position" content="33.9462;-84.3346" />
        <meta name="ICBM" content="33.9462, -84.3346" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>DUNWOODY'S PREMIER AUTO DETAILING STUDIO</Title>
        <Title className={classes.heroTitle}>AUTO DETAILING IN DUNWOODY, GA</Title>
        <div className={classes.buttonContainer}>
          <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Book Appointment</Link>
          <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
        </div>
      </div>

      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
            <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 755, cols: 1, spacing: 'sm' }]}>
              <div>
                <img src={curingLamp} alt="Professional ceramic coating in Dunwoody, GA near Perimeter" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Luxury Auto Detailing Near Perimeter Mall</Title>
                <Text className={classes.WhyDesc}>
                  <strong>Dunwoody's discerning vehicle owners</strong> trust Supreme Detail Studio for premium auto detailing services. Located near the Perimeter business district, we bring professional-grade car care to Dunwoody and surrounding DeKalb County communities.
                </Text>
                <Text className={classes.WhyDesc}>
                  Whether you work in the Perimeter area or live in Dunwoody's prestigious neighborhoods, our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>professional detailing services</Link> deliver showroom-quality results.
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic Coating Protection</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint Protection Film (PPF)</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Window Tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction</Link></li>
                  <li><Link to="/services/detailing" style={{ color: '#FFF' }}>Full Detailing Packages</Link></li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Why Dunwoody Residents Choose Us</Title>
                <Text className={classes.WhyDesc}>
                  As <strong>Dunwoody's trusted auto detailing experts</strong>, we deliver exceptional results with every vehicle. Our certified technicians use only professional-grade products.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>ONYX & STEK Certified</strong> – Professional installations</li>
                  <li><strong>Premium Products</strong> – Industry-leading coatings</li>
                  <li><strong>Mobile Service</strong> – We come to your office or home</li>
                  <li><strong>5-Star Reviews</strong> – Trusted by Perimeter professionals</li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Get Free Quote</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={TeslaInterior} alt="Tesla interior detailing Dunwoody GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Dunwoody & Perimeter Area</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Dunwoody and neighboring communities:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/service-areas/sandy-springs" style={{ color: '#fff', textDecoration: 'underline' }}>Sandy Springs, GA</Link>
                <span style={{ color: '#fff' }}>Brookhaven, GA</span>
                <span style={{ color: '#fff' }}>Chamblee, GA</span>
                <Link to="/service-areas/atlanta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Atlanta, GA</Link>
                <Link to="/service-areas/roswell-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Roswell, GA</Link>
                <span style={{ color: '#fff' }}>Doraville, GA</span>
                <span style={{ color: '#fff' }}>Tucker, GA</span>
                <Link to="/service-areas/alpharetta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Alpharetta, GA</Link>
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

export default DunwoodyGAPage;

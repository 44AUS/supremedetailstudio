import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import LeatherSeats from '../assets/images/details/leather-seats.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';
import BMWSteeringWheel from '../assets/images/details/bmw-steering-wheel.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: '15px', paddingBottom: 80, position: 'relative' },
  heroWrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${LeatherSeats})`,
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

const WoodstockGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Woodstock, GA",
    "description": "Professional window tinting, auto detailing, ceramic coating, and paint protection film services in Woodstock, GA. Serving Cherokee County and North Metro Atlanta.",
    "url": "https://supremedetailstudio.com/service-areas/woodstock-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Woodstock", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "34.1015", "longitude": "-84.5194" },
    "areaServed": [
      { "@type": "City", "name": "Woodstock", "addressRegion": "GA" },
      { "@type": "City", "name": "Canton", "addressRegion": "GA" },
      { "@type": "City", "name": "Acworth", "addressRegion": "GA" },
      { "@type": "City", "name": "Kennesaw", "addressRegion": "GA" },
      { "@type": "City", "name": "Holly Springs", "addressRegion": "GA" }
    ],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "16:00" }
    ],
    "priceRange": "$$",
    "image": "https://supremedetailstudio.com/preview.png",
    "sameAs": ["https://www.google.com/maps/place/Supreme+Detail+Studio/@33.8836625,-84.409205", "https://www.facebook.com/supremedetailstudio"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Detailing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Woodstock, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Woodstock, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Woodstock, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Woodstock, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I get window tinting in Woodstock, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio provides professional window tinting in Woodstock, GA. We offer automotive, residential, and commercial tinting with premium films that block heat and UV rays." } },
      { "@type": "Question", "name": "What are the window tint laws in Georgia?", "acceptedAnswer": { "@type": "Answer", "text": "Georgia law allows 32% VLT on front side windows and any darkness on rear windows. Supreme Detail Studio ensures all installations comply with Georgia tint laws while maximizing heat rejection." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Window Tinting Woodstock GA | Auto Detailing & Ceramic Coating | Supreme Detail Studio</title>
        <meta name="title" content="Window Tinting Woodstock GA | Auto Detailing & Ceramic Coating | Supreme Detail Studio" />
        <meta name="description" content="Professional window tinting in Woodstock, GA. Premium automotive, residential & commercial tint. Also offering ceramic coating, PPF & auto detailing. Serving Cherokee County. Call (502) 417-0690!" />
        <meta name="keywords" content="window tinting woodstock ga, car tint woodstock, auto detailing woodstock ga, ceramic coating woodstock, ppf woodstock ga, car detailing woodstock georgia, canton window tint, cherokee county detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/woodstock-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/woodstock-ga" />
        <meta property="og:title" content="Window Tinting Woodstock GA | Auto Detailing" />
        <meta property="og:description" content="Professional window tinting in Woodstock, GA. Premium automotive & commercial tint. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Window Tinting Woodstock GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Woodstock" />
        <meta name="geo.position" content="34.1015;-84.5194" />
        <meta name="ICBM" content="34.1015, -84.5194" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>WOODSTOCK'S PREMIER WINDOW TINTING EXPERTS</Title>
        <Title className={classes.heroTitle}>WINDOW TINTING IN WOODSTOCK, GA</Title>
        <div className={classes.buttonContainer}>
          <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Get Free Quote</Link>
          <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
        </div>
      </div>

      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
            <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 755, cols: 1, spacing: 'sm' }]}>
              <div>
                <img src={TeslaInterior} alt="Professional window tinting in Woodstock, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Professional Window Tinting in Woodstock, GA</Title>
                <Text className={classes.WhyDesc}>
                  Looking for <strong>quality window tinting in Woodstock, GA</strong>? Supreme Detail Studio offers premium automotive, residential, and commercial window tinting services throughout Cherokee County.
                </Text>
                <Text className={classes.WhyDesc}>
                  Our <Link to="/services/window-tinting" style={{ textDecoration: 'underline', color: '#FFF' }}>window tinting services</Link> use premium ceramic films that block heat and harmful UV rays while keeping your vehicle looking sleek.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Heat Rejection</strong> – Keep your car cooler</li>
                  <li><strong>UV Protection</strong> – Blocks 99% of harmful rays</li>
                  <li><strong>Privacy & Security</strong> – Protect your belongings</li>
                  <li><strong>Glare Reduction</strong> – Safer, more comfortable driving</li>
                  <li><strong>Georgia Legal</strong> – Compliant with state laws</li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Full Auto Detailing Services</Title>
                <Text className={classes.WhyDesc}>
                  Beyond window tinting, Supreme Detail Studio provides comprehensive <strong>auto detailing in Woodstock</strong>:
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic Coating Protection</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint Protection Film (PPF)</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction</Link></li>
                  <li><Link to="/services/detailing" style={{ color: '#FFF' }}>Interior & Exterior Detailing</Link></li>
                  <li><Link to="/services/mobile-detailing" style={{ color: '#FFF' }}>Mobile Detailing Services</Link></li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Book Appointment</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={BMWSteeringWheel} alt="BMW interior detailing Woodstock GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Woodstock & Cherokee County</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Woodstock and the greater Cherokee County area:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <span style={{ color: '#fff' }}>Canton, GA</span>
                <Link to="/service-areas/acworth-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Acworth, GA</Link>
                <Link to="/service-areas/kennesaw-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                <span style={{ color: '#fff' }}>Holly Springs, GA</span>
                <Link to="/service-areas/marietta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <Link to="/service-areas/alpharetta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Alpharetta, GA</Link>
                <span style={{ color: '#fff' }}>Ball Ground, GA</span>
                <span style={{ color: '#fff' }}>Towne Lake, GA</span>
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

export default WoodstockGAPage;

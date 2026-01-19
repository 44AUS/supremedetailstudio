import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import BMWInterior from '../assets/images/details/bmw-dashboard.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: '15px', paddingBottom: 80, position: 'relative' },
  heroWrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${TeslaPlaid})`,
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

const AcworthGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Acworth, GA",
    "description": "Professional auto detailing, paint protection film, ceramic coating, and window tinting services in Acworth, GA. Serving North Cobb County and Cherokee County.",
    "url": "https://supremedetailstudio.com/service-areas/acworth-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Acworth", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "34.0662", "longitude": "-84.6769" },
    "areaServed": [
      { "@type": "City", "name": "Acworth", "addressRegion": "GA" },
      { "@type": "City", "name": "Kennesaw", "addressRegion": "GA" },
      { "@type": "City", "name": "Woodstock", "addressRegion": "GA" },
      { "@type": "City", "name": "Marietta", "addressRegion": "GA" },
      { "@type": "City", "name": "Dallas", "addressRegion": "GA" }
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
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Acworth, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Acworth, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Acworth, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Acworth, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I get PPF installed in Acworth, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio provides professional paint protection film (PPF) installation in Acworth. As STEK certified installers, we use premium films to protect your vehicle from rock chips and road debris." } },
      { "@type": "Question", "name": "Do you offer mobile detailing in Acworth?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Supreme Detail Studio offers mobile detailing services throughout Acworth, Kennesaw, and North Cobb County. Call (502) 417-0690 to schedule." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Paint Protection Film Acworth GA | Auto Detailing & Ceramic Coating | Supreme Detail Studio</title>
        <meta name="title" content="Paint Protection Film Acworth GA | Auto Detailing & Ceramic Coating | Supreme Detail Studio" />
        <meta name="description" content="Professional PPF installation in Acworth, GA. STEK certified installer offering paint protection film, ceramic coating, auto detailing & window tinting. Serving North Cobb County. Call (502) 417-0690!" />
        <meta name="keywords" content="paint protection film acworth ga, ppf acworth, auto detailing acworth ga, ceramic coating acworth, window tinting acworth ga, car detailing acworth georgia, clear bra acworth, kennesaw ppf" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/acworth-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/acworth-ga" />
        <meta property="og:title" content="Paint Protection Film Acworth GA | Auto Detailing" />
        <meta property="og:description" content="Professional PPF in Acworth, GA. STEK certified installer. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PPF Acworth GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Acworth" />
        <meta name="geo.position" content="34.0662;-84.6769" />
        <meta name="ICBM" content="34.0662, -84.6769" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>ACWORTH'S TRUSTED PPF & DETAILING EXPERTS</Title>
        <Title className={classes.heroTitle}>PAINT PROTECTION FILM IN ACWORTH, GA</Title>
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
                <img src={BMWExterior} alt="BMW with paint protection film in Acworth, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Paint Protection Film Services in Acworth, GA</Title>
                <Text className={classes.WhyDesc}>
                  Protect your vehicle's paint with professional <strong>paint protection film (PPF) in Acworth, GA</strong>. Supreme Detail Studio is your trusted STEK certified installer, providing premium clear bra installation that shields your car from rock chips, road debris, and environmental damage.
                </Text>
                <Text className={classes.WhyDesc}>
                  Our <Link to="/services/paint-protection-film" style={{ textDecoration: 'underline', color: '#FFF' }}>PPF services</Link> offer self-healing technology and UV protection, keeping your vehicle looking new for years.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Self-Healing Technology</strong> – Minor scratches disappear</li>
                  <li><strong>UV Protection</strong> – Prevents yellowing and fading</li>
                  <li><strong>Rock Chip Defense</strong> – Shields high-impact areas</li>
                  <li><strong>10-Year Warranty</strong> – Long-term peace of mind</li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Complete Auto Detailing Services</Title>
                <Text className={classes.WhyDesc}>
                  Beyond PPF, Supreme Detail Studio offers full <strong>auto detailing services in Acworth</strong>:
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic Coating Protection</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Professional Window Tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction</Link></li>
                  <li><Link to="/services/detailing" style={{ color: '#FFF' }}>Interior & Exterior Detailing</Link></li>
                  <li><Link to="/services/headlight-restoration" style={{ color: '#FFF' }}>Headlight Restoration</Link></li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Book Appointment</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={BMWInterior} alt="BMW interior detailing Acworth GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Acworth & North Cobb County</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Acworth and the greater North Cobb & Cherokee County area:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/service-areas/kennesaw-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                <Link to="/service-areas/woodstock-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Woodstock, GA</Link>
                <Link to="/service-areas/marietta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <span style={{ color: '#fff' }}>Dallas, GA</span>
                <span style={{ color: '#fff' }}>Cartersville, GA</span>
                <span style={{ color: '#fff' }}>Canton, GA</span>
                <span style={{ color: '#fff' }}>Hiram, GA</span>
                <span style={{ color: '#fff' }}>Powder Springs, GA</span>
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

export default AcworthGAPage;

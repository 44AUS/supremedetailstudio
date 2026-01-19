import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import Onyx from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import OnyxAplicator from '../assets/images/ceramic-coatings/onyx-coating-show.jpg';
import BMWExterior from '../assets/images/details/bmw-760i.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: '15px', paddingBottom: 80, position: 'relative' },
  heroWrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${Onyx})`,
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

const CantonGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Canton, GA",
    "description": "Professional auto detailing, ceramic coating, paint protection film, and window tinting services in Canton, GA. Serving Cherokee County and North Georgia.",
    "url": "https://supremedetailstudio.com/service-areas/canton-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Canton", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "34.2368", "longitude": "-84.4908" },
    "areaServed": [
      { "@type": "City", "name": "Canton", "addressRegion": "GA" },
      { "@type": "City", "name": "Woodstock", "addressRegion": "GA" },
      { "@type": "City", "name": "Holly Springs", "addressRegion": "GA" },
      { "@type": "City", "name": "Ball Ground", "addressRegion": "GA" },
      { "@type": "City", "name": "Waleska", "addressRegion": "GA" }
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
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Canton, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Canton, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Canton, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Canton, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I get ceramic coating in Canton, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio provides professional ceramic coating services to Canton and Cherokee County. As an ONYX certified installer, we deliver premium paint protection that lasts for years." } },
      { "@type": "Question", "name": "Do you service vehicles in Cherokee County?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Supreme Detail Studio serves all of Cherokee County including Canton, Woodstock, Holly Springs, Ball Ground, and surrounding areas. Call (502) 417-0690 to schedule." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Auto Detailing Canton GA | Ceramic Coating & PPF Cherokee County | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Canton GA | Ceramic Coating & PPF Cherokee County | Supreme Detail Studio" />
        <meta name="description" content="Professional auto detailing in Canton, GA. Ceramic coating, paint protection film, window tinting & paint correction. Serving Cherokee County & North Georgia. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing canton ga, car detailing canton, ceramic coating canton ga, ppf canton, paint protection film canton ga, window tinting canton ga, cherokee county detailing, holly springs auto detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/canton-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/canton-ga" />
        <meta property="og:title" content="Auto Detailing Canton GA | Cherokee County" />
        <meta property="og:description" content="Professional auto detailing in Canton, GA. Ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auto Detailing Canton GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Canton" />
        <meta name="geo.position" content="34.2368;-84.4908" />
        <meta name="ICBM" content="34.2368, -84.4908" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>CHEROKEE COUNTY'S AUTO DETAILING EXPERTS</Title>
        <Title className={classes.heroTitle}>AUTO DETAILING IN CANTON, GA</Title>
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
                <img src={OnyxAplicator} alt="ONYX ceramic coating application in Canton, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Professional Auto Detailing in Canton, GA</Title>
                <Text className={classes.WhyDesc}>
                  Looking for <strong>quality auto detailing in Canton, GA</strong>? Supreme Detail Studio brings professional car care services to Canton and all of Cherokee County. Our ONYX certified team delivers premium results.
                </Text>
                <Text className={classes.WhyDesc}>
                  From daily drivers to trucks and SUVs, our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>comprehensive detailing services</Link> keep your vehicle protected against North Georgia's elements.
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic Coating Protection</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint Protection Film (PPF)</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Window Tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction</Link></li>
                  <li><Link to="/services/mobile-detailing" style={{ color: '#FFF' }}>Mobile Detailing</Link></li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Protecting Your Investment</Title>
                <Text className={classes.WhyDesc}>
                  <strong>Canton's roads</strong> can be tough on vehicles. Our protective services shield your paint from:
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Road Debris</strong> – Gravel and rock chips from mountain roads</li>
                  <li><strong>Tree Sap & Pollen</strong> – Common in North Georgia</li>
                  <li><strong>UV Damage</strong> – Georgia sun is harsh on paint</li>
                  <li><strong>Bird Droppings</strong> – Etches paint if not protected</li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Book Appointment</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={BMWExterior} alt="BMW exterior detailing Canton GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Canton & Cherokee County</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Canton and the entire Cherokee County area:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/service-areas/woodstock-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Woodstock, GA</Link>
                <span style={{ color: '#fff' }}>Holly Springs, GA</span>
                <span style={{ color: '#fff' }}>Ball Ground, GA</span>
                <span style={{ color: '#fff' }}>Waleska, GA</span>
                <Link to="/service-areas/acworth-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Acworth, GA</Link>
                <Link to="/service-areas/kennesaw-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                <span style={{ color: '#fff' }}>Jasper, GA</span>
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

export default CantonGAPage;

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import Onyx from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import OnyxAplicator from '../assets/images/ceramic-coatings/onyx-coating-show.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';

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

const AlpharettaGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Alpharetta, GA",
    "description": "Premium ceramic coating and auto detailing in Alpharetta, GA. Professional PPF, window tinting, and paint correction for luxury vehicles. ONYX certified installer.",
    "url": "https://supremedetailstudio.com/service-areas/alpharetta-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Alpharetta", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "34.0754", "longitude": "-84.2941" },
    "areaServed": [
      { "@type": "City", "name": "Alpharetta", "addressRegion": "GA" },
      { "@type": "City", "name": "Roswell", "addressRegion": "GA" },
      { "@type": "City", "name": "Johns Creek", "addressRegion": "GA" },
      { "@type": "City", "name": "Milton", "addressRegion": "GA" },
      { "@type": "City", "name": "Cumming", "addressRegion": "GA" }
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
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Alpharetta, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Alpharetta, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Alpharetta, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Alpharetta, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I get ceramic coating in Alpharetta, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio is Alpharetta's trusted ONYX certified ceramic coating installer. We provide premium ceramic coating services with long-lasting protection for your vehicle." } },
      { "@type": "Question", "name": "How long does ceramic coating last?", "acceptedAnswer": { "@type": "Answer", "text": "Professional ceramic coating from Supreme Detail Studio lasts 2-5+ years depending on the package. Our ONYX coatings provide superior protection against Georgia weather and road conditions." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Ceramic Coating Alpharetta GA | Auto Detailing & PPF | Supreme Detail Studio</title>
        <meta name="title" content="Ceramic Coating Alpharetta GA | Auto Detailing & PPF | Supreme Detail Studio" />
        <meta name="description" content="Best ceramic coating in Alpharetta, GA. ONYX certified installer offering professional ceramic coating, auto detailing, PPF & window tinting. Call (502) 417-0690!" />
        <meta name="keywords" content="ceramic coating alpharetta ga, auto detailing alpharetta, paint protection film alpharetta ga, ppf alpharetta, window tinting alpharetta ga, car detailing alpharetta georgia, onyx ceramic coating, johns creek detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/alpharetta-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/alpharetta-ga" />
        <meta property="og:title" content="Ceramic Coating Alpharetta GA | Auto Detailing & PPF" />
        <meta property="og:description" content="Best ceramic coating in Alpharetta, GA. ONYX certified installer. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ceramic Coating Alpharetta GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Alpharetta" />
        <meta name="geo.position" content="34.0754;-84.2941" />
        <meta name="ICBM" content="34.0754, -84.2941" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>ALPHARETTA'S TRUSTED CERAMIC COATING EXPERTS</Title>
        <Title className={classes.heroTitle}>CERAMIC COATING IN ALPHARETTA, GA</Title>
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
                <img src={OnyxAplicator} alt="ONYX ceramic coating application in Alpharetta, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Premium Ceramic Coating in Alpharetta, GA</Title>
                <Text className={classes.WhyDesc}>
                  Looking for the <strong>best ceramic coating in Alpharetta, GA</strong>? Supreme Detail Studio is your trusted ONYX certified installer, providing premium ceramic coating services that protect and enhance your vehicle's appearance.
                </Text>
                <Text className={classes.WhyDesc}>
                  Our professional <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline', color: '#FFF' }}>ceramic coating services</Link> create a durable, hydrophobic layer that shields your paint from UV damage, bird droppings, tree sap, and harsh Georgia weather.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Superior UV Protection</strong> – Prevents paint fading</li>
                  <li><strong>Hydrophobic Properties</strong> – Water beads and rolls off</li>
                  <li><strong>Enhanced Gloss</strong> – Deep, mirror-like shine</li>
                  <li><strong>Long-Lasting</strong> – 2-5+ year protection</li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Full Auto Detailing Services</Title>
                <Text className={classes.WhyDesc}>
                  Beyond ceramic coating, Supreme Detail Studio offers comprehensive <strong>auto detailing in Alpharetta</strong>:
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint Protection Film (PPF/Clear Bra)</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Professional Window Tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction & Swirl Removal</Link></li>
                  <li><Link to="/services/detailing" style={{ color: '#FFF' }}>Interior & Exterior Detailing</Link></li>
                  <li><Link to="/services/mobile-detailing" style={{ color: '#FFF' }}>Mobile Detailing Services</Link></li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Book Appointment</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={TeslaInterior} alt="Tesla interior detailing Alpharetta GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Alpharetta & North Atlanta</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Alpharetta and neighboring North Atlanta communities:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/service-areas/roswell-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Roswell, GA</Link>
                <span style={{ color: '#fff' }}>Johns Creek, GA</span>
                <span style={{ color: '#fff' }}>Milton, GA</span>
                <span style={{ color: '#fff' }}>Cumming, GA</span>
                <Link to="/service-areas/sandy-springs" style={{ color: '#fff', textDecoration: 'underline' }}>Sandy Springs, GA</Link>
                <Link to="/service-areas/marietta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <span style={{ color: '#fff' }}>Duluth, GA</span>
                <span style={{ color: '#fff' }}>Suwanee, GA</span>
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

export default AlpharettaGAPage;

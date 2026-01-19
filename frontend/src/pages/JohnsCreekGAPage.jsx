import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import LeatherSeats from '../assets/images/details/leather-seats.jpg';
import BMWInterior from '../assets/images/details/bmw-dashboard.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';

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

const JohnsCreekGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Johns Creek, GA",
    "description": "Luxury auto detailing, ceramic coating, paint protection film, and window tinting services in Johns Creek, GA. Serving North Fulton County's most exclusive neighborhoods.",
    "url": "https://supremedetailstudio.com/service-areas/johns-creek-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Johns Creek", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "34.0289", "longitude": "-84.1989" },
    "areaServed": [
      { "@type": "City", "name": "Johns Creek", "addressRegion": "GA" },
      { "@type": "City", "name": "Alpharetta", "addressRegion": "GA" },
      { "@type": "City", "name": "Duluth", "addressRegion": "GA" },
      { "@type": "City", "name": "Suwanee", "addressRegion": "GA" },
      { "@type": "City", "name": "Roswell", "addressRegion": "GA" }
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
      "name": "Luxury Auto Detailing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Auto Detailing in Johns Creek, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Johns Creek, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Johns Creek, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Johns Creek, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I get luxury car detailing in Johns Creek?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio provides luxury auto detailing services to Johns Creek residents. We specialize in high-end vehicles including Mercedes, BMW, Porsche, Tesla, and exotic cars." } },
      { "@type": "Question", "name": "What is the best ceramic coating in Johns Creek, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio is Johns Creek's trusted ONYX certified ceramic coating installer. Our professional-grade coatings provide 2-5+ years of protection for your vehicle's paint." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Luxury Auto Detailing Johns Creek GA | Ceramic Coating & PPF | Supreme Detail Studio</title>
        <meta name="title" content="Luxury Auto Detailing Johns Creek GA | Ceramic Coating & PPF | Supreme Detail Studio" />
        <meta name="description" content="Luxury auto detailing in Johns Creek, GA. Professional ceramic coating, paint protection film, window tinting for high-end vehicles. Serving North Fulton County. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing johns creek ga, luxury car detailing johns creek, ceramic coating johns creek ga, ppf johns creek, paint protection film johns creek ga, window tinting johns creek, suwanee detailing, duluth auto detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/johns-creek-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/johns-creek-ga" />
        <meta property="og:title" content="Luxury Auto Detailing Johns Creek GA" />
        <meta property="og:description" content="Luxury auto detailing in Johns Creek, GA. Ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Detailing Johns Creek GA | Supreme Detail Studio" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Johns Creek" />
        <meta name="geo.position" content="34.0289;-84.1989" />
        <meta name="ICBM" content="34.0289, -84.1989" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>JOHNS CREEK'S LUXURY AUTO DETAILING EXPERTS</Title>
        <Title className={classes.heroTitle}>LUXURY DETAILING IN JOHNS CREEK, GA</Title>
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
                <img src={BMWInterior} alt="Luxury BMW interior detailing in Johns Creek, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Premium Auto Detailing for Johns Creek</Title>
                <Text className={classes.WhyDesc}>
                  <strong>Johns Creek's most discerning vehicle owners</strong> trust Supreme Detail Studio for luxury auto detailing. Our expert team specializes in high-end vehicles including Mercedes-Benz, BMW, Porsche, Tesla, and exotic cars.
                </Text>
                <Text className={classes.WhyDesc}>
                  Living in one of Atlanta's most prestigious communities means your vehicle deserves the best care. Our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>professional detailing services</Link> match the quality Johns Creek residents expect.
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>ONYX Ceramic Coating</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>STEK Paint Protection Film</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Premium Window Tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint Correction & Enhancement</Link></li>
                  <li><Link to="/services/full-detail" style={{ color: '#FFF' }}>Full Detail Packages</Link></li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Concierge-Level Service</Title>
                <Text className={classes.WhyDesc}>
                  We understand <strong>Johns Creek residents</strong> value their time. That's why we offer convenient mobile detailing services that come directly to your home or office.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Mobile Service</strong> – We come to your Johns Creek home</li>
                  <li><strong>Certified Installers</strong> – ONYX & STEK trained professionals</li>
                  <li><strong>Exotic Car Specialists</strong> – Experience with high-end vehicles</li>
                  <li><strong>Flexible Scheduling</strong> – Work around your busy schedule</li>
                </ul>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Get Free Quote</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
              <div>
                <img src={TeslaPlaid} alt="Tesla paint correction Johns Creek GA" className={classes.img} loading="lazy" />
              </div>
            </SimpleGrid>

            <section style={{ marginTop: '60px' }}>
              <Title order={2} className={classes.h1Center}>Serving Johns Creek & North Fulton</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio serves Johns Creek and neighboring North Atlanta communities:
              </Text>
              <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 755, cols: 2, spacing: 'sm' }]} style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/service-areas/alpharetta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Alpharetta, GA</Link>
                <Link to="/service-areas/roswell-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Roswell, GA</Link>
                <span style={{ color: '#fff' }}>Duluth, GA</span>
                <span style={{ color: '#fff' }}>Suwanee, GA</span>
                <span style={{ color: '#fff' }}>Milton, GA</span>
                <span style={{ color: '#fff' }}>Peachtree Corners, GA</span>
                <Link to="/service-areas/dunwoody-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Dunwoody, GA</Link>
                <span style={{ color: '#fff' }}>Cumming, GA</span>
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

export default JohnsCreekGAPage;

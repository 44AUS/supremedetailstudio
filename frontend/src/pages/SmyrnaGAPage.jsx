import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Services from '../components/Services/Services';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import BMWInterior from '../assets/images/details/bmw-dashboard.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: '15px', paddingBottom: 80, position: 'relative' },
  heroWrapper: {
    position: 'relative',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${BMWInterior})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: { paddingTop: '100px', paddingBottom: '100px' },
  },
  heroTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '58px',
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: '16px',
    [theme.fn.smallerThan('md')]: { fontSize: '32px', padding: '0 15px' },
  },
  heroSubtitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#e80200',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: '16px',
  },
  img: { borderRadius: '20px', width: '100%', height: 'auto' },
  h1: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 800,
    '@media (max-width: 520px)': { fontSize: 24, textAlign: 'center' },
  },
  h2: {
    marginTop: 0,
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '28px',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    fontWeight: 700,
    '@media (max-width: 520px)': { fontSize: 22, textAlign: 'center' },
  },
  h1Center: {
    marginTop: '15px',
    marginBottom: '15px',
    fontFamily: 'SceneProUltBlkIt',
    color: '#fff',
    fontSize: '32px',
    textTransform: 'uppercase',
    textAlign: 'center',
    '@media (max-width: 520px)': { fontSize: 24 },
  },
  WhyDesc: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#fff',
    fontSize: '15px',
    lineHeight: 1.8,
    fontWeight: 500,
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    '@media (max-width: 520px)': { textAlign: 'center' },
  },
  servicesList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    lineHeight: 2,
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
    borderRadius: '4px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(232, 2, 0, 0.4)',
    '&:hover': { backgroundColor: '#ff1a1a', transform: 'translateY(-3px)' },
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
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', transform: 'translateY(-3px)' },
  },
}));

const SmyrnaGAPage = () => {
  const { classes } = useStyles();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Smyrna, GA",
    "description": "Professional auto detailing, ceramic coating, paint protection film, and window tinting services in Smyrna, GA. Serving Cobb County and Metro Atlanta.",
    "url": "https://supremedetailstudio.com/service-areas/smyrna-ga",
    "telephone": "+1-502-417-0690",
    "address": { "@type": "PostalAddress", "addressLocality": "Smyrna", "addressRegion": "GA", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "33.8839", "longitude": "-84.5144" },
    "areaServed": [
      { "@type": "City", "name": "Smyrna", "addressRegion": "GA" },
      { "@type": "City", "name": "Marietta", "addressRegion": "GA" },
      { "@type": "City", "name": "Atlanta", "addressRegion": "GA" },
      { "@type": "City", "name": "Vinings", "addressRegion": "GA" }
    ],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "16:00" }
    ],
    "priceRange": "$$",
    "image": "https://supremedetailstudio.com/preview.png",
    "sameAs": ["https://www.google.com/maps/place/Supreme+Detail+Studio/@33.8836625,-84.409205", "https://www.facebook.com/supremedetailstudio", "https://www.instagram.com/supremedetailstudio"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Detailing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Detailing in Smyrna, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating in Smyrna, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film in Smyrna, GA" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting in Smyrna, GA" } }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What auto detailing services do you offer in Smyrna, GA?", "acceptedAnswer": { "@type": "Answer", "text": "Supreme Detail Studio offers comprehensive auto detailing in Smyrna including interior/exterior detailing, ceramic coating, paint protection film (PPF), window tinting, and paint correction services." } },
      { "@type": "Question", "name": "Do you offer mobile detailing in Smyrna?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We provide mobile detailing services throughout Smyrna, Vinings, and the greater Cobb County area. Call (502) 417-0690 to schedule." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Auto Detailing Smyrna GA | Ceramic Coating, PPF & Window Tint | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Smyrna GA | Ceramic Coating, PPF & Window Tint | Supreme Detail Studio" />
        <meta name="description" content="Top-rated auto detailing in Smyrna, GA. Professional ceramic coating, paint protection film (PPF), window tinting & paint correction. Serving Cobb County & Vinings. Call (502) 417-0690!" />
        <meta name="keywords" content="auto detailing smyrna ga, car detailing smyrna, ceramic coating smyrna ga, paint protection film smyrna, ppf smyrna ga, window tinting smyrna ga, mobile detailing smyrna, vinings auto detailing" />
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/smyrna-ga" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/smyrna-ga" />
        <meta property="og:title" content="Auto Detailing Smyrna GA | Ceramic Coating, PPF & Window Tint" />
        <meta property="og:description" content="Top-rated auto detailing in Smyrna, GA. Professional ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auto Detailing Smyrna GA | Supreme Detail Studio" />
        <meta name="twitter:description" content="Professional auto detailing in Smyrna, GA. Ceramic coating, PPF & window tinting. Call (502) 417-0690!" />
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Smyrna" />
        <meta name="geo.position" content="33.8839;-84.5144" />
        <meta name="ICBM" content="33.8839, -84.5144" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <div className={classes.heroWrapper}>
        <Title className={classes.heroSubtitle}>SMYRNA, GA'S TRUSTED AUTO DETAILING EXPERTS</Title>
        <Title className={classes.heroTitle}>AUTO DETAILING IN SMYRNA, GA</Title>
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
                <img src={BMWInterior} alt="Professional BMW interior detailing in Smyrna, GA" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={1} className={classes.h1}>Premium Auto Detailing Services in Smyrna, GA</Title>
                <Text className={classes.WhyDesc}>
                  Looking for the <strong>best auto detailing in Smyrna, GA</strong>? Supreme Detail Studio brings expert car care services to Smyrna and the surrounding Cobb County communities. Our team specializes in luxury and exotic vehicle detailing.
                </Text>
                <Text className={classes.WhyDesc}>
                  Whether you drive a Tesla, BMW, Mercedes, or daily driver, our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>professional detailing services</Link> deliver showroom-quality results.
                </Text>
                <ul className={classes.servicesList}>
                  <li>Full interior and exterior detailing</li>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic coating protection</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint protection film (PPF)</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Professional window tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint correction</Link></li>
                </ul>
              </div>

              <div>
                <Title order={2} className={classes.h2}>Why Smyrna Residents Choose Us</Title>
                <Text className={classes.WhyDesc}>
                  <strong>Smyrna vehicle owners</strong> trust Supreme Detail Studio because we deliver exceptional results. Located near the Vinings and Atlanta border, we're conveniently positioned to serve all of Cobb County.
                </Text>
                <ul className={classes.servicesList}>
                  <li><strong>Certified Professionals</strong> – ONYX & STEK certified installers</li>
                  <li><strong>Premium Products</strong> – Professional-grade coatings and films</li>
                  <li><strong>Mobile Service Available</strong> – We come to you in Smyrna</li>
                  <li><strong>5-Star Reviews</strong> – Trusted by Smyrna customers</li>
                </ul>
              </div>
              <div>
                <img src={TeslaPlaid} alt="Tesla paint correction in Smyrna GA" className={classes.img} loading="lazy" />
              </div>

              <div>
                <img src={TeslaInterior} alt="Tesla interior detailing Smyrna Georgia" className={classes.img} loading="lazy" />
              </div>
              <div>
                <Title order={2} className={classes.h2}>Serving Smyrna & Nearby Areas</Title>
                <Text className={classes.WhyDesc}>
                  Supreme Detail Studio proudly serves <strong>Smyrna, GA</strong> and surrounding communities:
                </Text>
                <SimpleGrid cols={2} spacing="sm" style={{ marginTop: '10px' }}>
                  <Link to="/service-areas/marietta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                  <Link to="/service-areas/atlanta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Atlanta, GA</Link>
                  <span style={{ color: '#fff' }}>Vinings, GA</span>
                  <Link to="/service-areas/kennesaw-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Kennesaw, GA</Link>
                </SimpleGrid>
                <div className={classes.buttonContainer}>
                  <Link to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" target="_blank" rel="noopener noreferrer" className={classes.primaryButton}>Get Free Quote</Link>
                  <Link to="tel:5024170690" className={classes.secondaryButton}>Call (502) 417-0690</Link>
                </div>
              </div>
            </SimpleGrid>
          </article>
        </Container>
        <Connecting />
        <Services />
      </main>
    </>
  );
};

export default SmyrnaGAPage;

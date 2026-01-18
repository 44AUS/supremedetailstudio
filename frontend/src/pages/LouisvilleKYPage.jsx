import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LouisvilleKYHero from '../components/Heroes/LouisvilleKYHero';
import Services from '../components/Services/Services';
import BMWInterior from '../assets/images/details/bmw-dashboard.jpg';
import TeslaPlaid from '../assets/images/details/tesla-paint-correction.jpg';
import TeslaInterior from '../assets/images/details/tesla-interior.jpg';

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
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    animation: 'fadein 1s',
    '@media (max-width: 520px)': {
      textAlign: 'center',
    },
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
  servicesList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    lineHeight: 2,
  },
}));

const MariettaGAPage = () => {
  const { classes } = useStyles();

  // Structured Data for Local Business SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Marietta, GA",
    "description": "Professional auto detailing, ceramic coating, paint protection film (PPF), and window tinting services in Marietta, GA. Serving Cobb County and surrounding areas.",
    "url": "https://supremedetailstudio.com/service-areas/marietta-ga",
    "telephone": "+1-502-417-0690",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marietta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.9526",
      "longitude": "-84.5499"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Marietta",
        "addressRegion": "GA"
      },
      {
        "@type": "City", 
        "name": "Kennesaw",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Smyrna",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Atlanta",
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
            "name": "Auto Detailing in Marietta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ceramic Coating in Marietta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Protection Film in Marietta, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Tinting in Marietta, GA"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Auto Detailing Marietta GA | Ceramic Coating, PPF & Window Tint | Supreme Detail Studio</title>
        <meta name="title" content="Auto Detailing Marietta GA | Ceramic Coating, PPF & Window Tint | Supreme Detail Studio" />
        <meta name="description" content="Top-rated auto detailing in Marietta, GA. Professional ceramic coating, paint protection film (PPF), window tinting & paint correction. Serving Cobb County. Call (502) 417-0690 for a free quote!" />
        <meta name="keywords" content="auto detailing marietta ga, car detailing marietta, ceramic coating marietta ga, paint protection film marietta, ppf marietta ga, window tinting marietta ga, mobile detailing marietta, paint correction marietta ga, car wash marietta, supreme detail studio marietta" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/marietta-ga" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/marietta-ga" />
        <meta property="og:title" content="Auto Detailing Marietta GA | Ceramic Coating, PPF & Window Tint | Supreme Detail Studio" />
        <meta property="og:description" content="Top-rated auto detailing in Marietta, GA. Professional ceramic coating, paint protection film (PPF), window tinting & paint correction. Serving Cobb County." />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://supremedetailstudio.com/service-areas/marietta-ga" />
        <meta name="twitter:title" content="Auto Detailing Marietta GA | Ceramic Coating, PPF & Window Tint" />
        <meta name="twitter:description" content="Top-rated auto detailing in Marietta, GA. Professional ceramic coating, PPF, window tinting. Call (502) 417-0690!" />
        <meta name="twitter:image" content="https://supremedetailstudio.com/preview.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Marietta" />
        <meta name="geo.position" content="33.9526;-84.5499" />
        <meta name="ICBM" content="33.9526, -84.5499" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <LouisvilleKYHero />
      
      <main>
        <Container size="xl">
          <article className={classes.wrapper}>
            {/* Main Content Section */}
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
                  src={BMWInterior} 
                  alt="Professional BMW interior detailing in Marietta, GA - Supreme Detail Studio" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
              <div>
                <header>
                  <Title order={1} className={classes.h1}>Auto Detailing Services in Marietta, GA</Title>
                </header>
                <Text className={classes.WhyDesc}>
                  Looking for the <strong>best auto detailing in Marietta, GA</strong>? Supreme Detail Studio is Cobb County's premier destination for professional car care services. Our experienced team specializes in luxury vehicle detailing, ensuring your prized automobile receives the meticulous attention it deserves.
                </Text>
                <Text className={classes.WhyDesc}>
                  Whether you drive a Tesla, BMW, Mercedes, or any high-end vehicle, our <Link to="/services/detailing" style={{ textDecoration: 'underline', color: '#FFF' }}>professional auto detailing services</Link> will restore and protect your investment. We combine industry-leading products with expert techniques to deliver showroom-quality results every time.
                </Text>
                <Text className={classes.WhyDesc}>
                  <strong>Our Marietta auto detailing services include:</strong>
                </Text>
                <ul className={classes.servicesList}>
                  <li>Full interior and exterior detailing</li>
                  <li><Link to="/services/ceramic-coatings" style={{ color: '#FFF' }}>Ceramic coating protection</Link></li>
                  <li><Link to="/services/paint-protection-film" style={{ color: '#FFF' }}>Paint protection film (PPF/Clear Bra)</Link></li>
                  <li><Link to="/services/window-tinting" style={{ color: '#FFF' }}>Professional window tinting</Link></li>
                  <li><Link to="/services/paint-correction" style={{ color: '#FFF' }}>Paint correction & swirl removal</Link></li>
                </ul>
              </div>
              
              <div>
                <Title order={2} className={classes.h2}>What Does Professional Car Detailing Include?</Title>
                <Text className={classes.WhyDesc}>
                  Our comprehensive <strong>Marietta car detailing packages</strong> go beyond a basic car wash. We meticulously clean, restore, and protect every surface of your vehicle:
                </Text>
                <Text className={classes.WhyDesc}>
                  <strong>Exterior Detailing:</strong> Hand wash, clay bar treatment, paint decontamination, polish, and protective sealant application. Your car's exterior faces harsh Georgia weather daily – our treatments provide lasting protection against UV damage, road debris, and environmental contaminants.
                </Text>
                <Text className={classes.WhyDesc}>
                  <strong>Interior Detailing:</strong> Deep cleaning of all surfaces including leather conditioning, carpet shampooing, dashboard protection, and odor elimination. We ensure your cabin is as pristine as the day you bought your vehicle.
                </Text>
                <Text className={classes.WhyDesc}>
                  <strong>Additional Services:</strong> We also offer <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline', color: '#FFF' }}>ceramic coating</Link>, <Link to="/services/window-tinting" style={{ textDecoration: 'underline', color: '#FFF' }}>window tinting</Link>, and wheel restoration to complete your vehicle's transformation.
                </Text>
              </div>
              <div>
                <img 
                  src={TeslaPlaid} 
                  alt="Tesla paint correction service in Marietta GA - Supreme Detail Studio" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
              
              <div>
                <img 
                  src={TeslaInterior} 
                  alt="Tesla interior detailing Marietta Georgia - Supreme Detail Studio" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
              <div>
                <Title order={2} className={classes.h2}>Serving Marietta & Surrounding Areas</Title>
                <Text className={classes.WhyDesc}>
                  Supreme Detail Studio proudly serves <strong>Marietta, GA</strong> and the greater Cobb County area. We also provide mobile detailing services to nearby communities including:
                </Text>
                <ul className={classes.servicesList}>
                  <li><Link to="/service-areas/kennesaw-ga" style={{ color: '#FFF' }}>Kennesaw, GA</Link></li>
                  <li><Link to="/service-areas/sandy-springs" style={{ color: '#FFF' }}>Sandy Springs, GA</Link></li>
                  <li><Link to="/service-areas/atlanta-ga" style={{ color: '#FFF' }}>Atlanta, GA</Link></li>
                  <li>Smyrna, GA</li>
                  <li>Roswell, GA</li>
                  <li>Acworth, GA</li>
                </ul>
                <Text className={classes.WhyDesc}>
                  Ready to experience the Supreme Detail Studio difference? <strong>Contact us today</strong> for a free quote on our auto detailing services in Marietta, GA!
                </Text>
                <div className={classes.buttonContainer}>
                  <Link 
                    to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={classes.primaryButton}
                    aria-label="Book auto detailing appointment in Marietta GA"
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
            </SimpleGrid>
            
            <Services />
          </article>
        </Container>
      </main>
    </>
  );
};

export default MariettaGAPage;

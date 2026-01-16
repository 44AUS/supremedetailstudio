import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Container, SimpleGrid, Text, Title, createStyles } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import StMatthewsHero from '../components/Heroes/StMatthewsKYHero';
import Onyx from '../assets/images/ceramic-coatings/onyx-coating.jpg';
import OnyxAplicator from '../assets/images/ceramic-coatings/onyx-coating-show.jpg';
import Connecting from '../components/BenefitsAndImportance/Connecting';
import CeramicTabs from '../components/CeramicCoating/CeramicCoatingTabs';
import Services from '../components/Services/Services';
import CertifiedCeramicComponent from '../components/BenefitsAndImportance/CeramicCertifiedInstaller';

const useStyles = createStyles((theme) => ({
  bgBody: {
    backgroundColor: '#0f0f0f',
  },
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
  h1Main: {
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
  desc: {
    fontFamily: 'SceneProRg',
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
    fontFamily: `SceneProRg`,
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
  benefitsList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#fff',
    fontFamily: 'SceneProRg',
    fontSize: '15px',
    lineHeight: 2.2,
    marginTop: '15px',
    marginBottom: '15px',
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

const KennesawGAPage = () => {
  const { classes } = useStyles();

  // Structured Data for Local Business SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Supreme Detail Studio - Kennesaw, GA",
    "description": "Professional ceramic coating, auto detailing, paint protection film, and window tinting services in Kennesaw, GA. ONYX certified installer serving Cobb County.",
    "url": "https://supremedetailstudio.com/service-areas/kennesaw-ga",
    "telephone": "+1-502-417-0690",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kennesaw",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0234",
      "longitude": "-84.6155"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kennesaw",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Marietta",
        "addressRegion": "GA"
      },
      {
        "@type": "City", 
        "name": "Acworth",
        "addressRegion": "GA"
      },
      {
        "@type": "City",
        "name": "Woodstock",
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
      "name": "Ceramic Coating Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ceramic Coating in Kennesaw, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Detailing in Kennesaw, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Protection Film in Kennesaw, GA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Tinting in Kennesaw, GA"
          }
        }
      ]
    }
  };

  // FAQ Structured Data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does ceramic coating last in Kennesaw, GA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional ceramic coating from Supreme Detail Studio can last 2-5+ years depending on the package selected. Our ONYX ceramic coatings provide superior protection against Georgia's harsh sun, rain, and road conditions."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of ceramic coating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ceramic coating provides UV protection, hydrophobic properties (water beading), scratch resistance, easier cleaning, enhanced gloss, and protection against environmental contaminants like bird droppings and tree sap."
        }
      },
      {
        "@type": "Question",
        "name": "How much does ceramic coating cost in Kennesaw?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ceramic coating prices vary based on vehicle size and package selected. Contact Supreme Detail Studio at (502) 417-0690 for a free quote tailored to your vehicle's needs."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Ceramic Coating Kennesaw GA | Auto Detailing & PPF | Supreme Detail Studio</title>
        <meta name="title" content="Ceramic Coating Kennesaw GA | Auto Detailing & PPF | Supreme Detail Studio" />
        <meta name="description" content="Best ceramic coating in Kennesaw, GA. ONYX certified installer offering professional ceramic coating, paint protection film, auto detailing & window tinting. Protect your car's paint today! Call (502) 417-0690." />
        <meta name="keywords" content="ceramic coating kennesaw ga, auto detailing kennesaw, paint protection film kennesaw ga, ppf kennesaw, window tinting kennesaw ga, car detailing kennesaw georgia, onyx ceramic coating, paint correction kennesaw, supreme detail studio kennesaw" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://supremedetailstudio.com/service-areas/kennesaw-ga" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supremedetailstudio.com/service-areas/kennesaw-ga" />
        <meta property="og:title" content="Ceramic Coating Kennesaw GA | Auto Detailing & PPF | Supreme Detail Studio" />
        <meta property="og:description" content="Best ceramic coating in Kennesaw, GA. ONYX certified installer. Professional auto detailing, PPF & window tinting. Call (502) 417-0690!" />
        <meta property="og:image" content="https://supremedetailstudio.com/preview.png" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://supremedetailstudio.com/service-areas/kennesaw-ga" />
        <meta name="twitter:title" content="Ceramic Coating Kennesaw GA | ONYX Certified Installer" />
        <meta name="twitter:description" content="Professional ceramic coating in Kennesaw, GA. Protect your paint with industry-leading ONYX ceramic coatings. Call (502) 417-0690!" />
        <meta name="twitter:image" content="https://supremedetailstudio.com/preview.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Kennesaw" />
        <meta name="geo.position" content="34.0234;-84.6155" />
        <meta name="ICBM" content="34.0234, -84.6155" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <StMatthewsHero />
      
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
                <img 
                  src={Onyx} 
                  alt="ONYX ceramic coating application in Kennesaw, GA - Supreme Detail Studio" 
                  className={classes.img}
                  loading="lazy"
                />
              </div>
              <div>
                <header>
                  <Title className={classes.desc}>THE BEST CERAMIC COATING IN KENNESAW, GA</Title>
                  <Title order={1} className={classes.h1}>Professional Ceramic Coating Services</Title>
                </header>
                <Text className={classes.WhyDesc}>
                  Looking for the <strong>best ceramic coating in Kennesaw, GA</strong>? Supreme Detail Studio is your trusted ONYX certified installer, providing premium ceramic coating services that protect and enhance your vehicle's appearance.
                </Text>
                <Text className={classes.WhyDesc}>
                  Our professional <Link to="/services/ceramic-coatings" style={{ textDecoration: 'underline', color: '#e80200' }}>ceramic coating services</Link> create a durable, hydrophobic layer that shields your paint from UV damage, bird droppings, tree sap, and harsh Georgia weather conditions. Experience the difference of professional-grade protection!
                </Text>
                <div className={classes.buttonContainer}>
                  <Link 
                    to="https://app.urable.com/virtual-shop/SxuPVxIQ2P7KOV77y6qD" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={classes.primaryButton}
                    aria-label="Book ceramic coating appointment in Kennesaw GA"
                  >
                    Get Free Quote
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

            <section>
              <Title order={2} className={classes.h1Main}>Why Choose Ceramic Coating for Your Vehicle?</Title>
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
                    Ceramic coating is the ultimate paint protection solution for Kennesaw vehicle owners. Here's why our customers choose <strong>ceramic coating over traditional wax</strong>:
                  </Text>
                  <ul className={classes.benefitsList}>
                    <li><strong>Superior UV Protection</strong> – Prevents paint oxidation and fading from Georgia's intense sun</li>
                    <li><strong>Hydrophobic Properties</strong> – Water beads and rolls off, making cleaning effortless</li>
                    <li><strong>Chemical Resistance</strong> – Protection against bird droppings, tree sap, and road salt</li>
                    <li><strong>Enhanced Gloss</strong> – Deep, mirror-like shine that lasts for years</li>
                    <li><strong>Scratch Resistance</strong> – Added protection against minor scratches and swirl marks</li>
                    <li><strong>Long-Lasting</strong> – 2-5+ year protection vs. months with traditional wax</li>
                  </ul>
                  <Text className={classes.WhyDesc}>
                    Beyond protection, ceramic coating can actually <strong>increase your vehicle's resale value</strong> by maintaining its pristine appearance for years to come.
                  </Text>
                </div>
                <div>
                  <img 
                    src={OnyxAplicator} 
                    alt="Professional ceramic coating application process in Kennesaw Georgia" 
                    className={classes.img}
                    loading="lazy"
                  />
                </div>
              </SimpleGrid>
            </section>
          </article>
        </Container>

        <CertifiedCeramicComponent />
        
        <section className={classes.bgBody}>
          <Container size="xl">
            <div className={classes.wrapper}>
              <Title order={2} className={classes.h1Main}>Our Ceramic Coating Packages in Kennesaw, GA</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px' }}>
                We offer multiple ceramic coating packages to fit your needs and budget. From entry-level protection to our premium multi-year coatings, we have the perfect solution for your vehicle.
              </Text>
              <CeramicTabs />
            </div>
          </Container>
        </section>

        <Connecting />
        
        <section>
          <Container size="xl">
            <div className={classes.wrapper}>
              <Title order={2} className={classes.h1Main}>Serving Kennesaw & Surrounding Areas</Title>
              <Text className={classes.WhyDesc} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Supreme Detail Studio proudly provides ceramic coating services to Kennesaw and the greater North Metro Atlanta area. We also serve:
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
                <Link to="/service-areas/marietta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Marietta, GA</Link>
                <Link to="/service-areas/atlanta-ga" style={{ color: '#fff', textDecoration: 'underline' }}>Atlanta, GA</Link>
                <Link to="/service-areas/sandy-springs" style={{ color: '#fff', textDecoration: 'underline' }}>Sandy Springs, GA</Link>
                <span style={{ color: '#fff' }}>Acworth, GA</span>
                <span style={{ color: '#fff' }}>Woodstock, GA</span>
                <span style={{ color: '#fff' }}>Roswell, GA</span>
                <span style={{ color: '#fff' }}>Canton, GA</span>
                <span style={{ color: '#fff' }}>Alpharetta, GA</span>
              </SimpleGrid>
            </div>
          </Container>
        </section>
        
        <Services />
      </main>
    </>
  );
};

export default KennesawGAPage;

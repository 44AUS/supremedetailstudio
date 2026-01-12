import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax';
import { Helmet } from 'react-helmet';
import HeaderMenu from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/LandingPage';
import Detailing from './pages/DetailingPage';
import FullDetailing from './pages/FullDetailPage';
import ExteriorDetailing from './pages/ExteriorDetailPage';
import InteriorDetailing from './pages/InteriorDetailPage';
import AddOnServicesPage from './pages/AddOnServicePage';
import HeadlightRestoration from './pages/HeadlightRestorationPage';
import PPF from './pages/PPFPage';
import WindshieldProtectionFilmPage from './pages/WindshieldProtectionFilmPage';
import HeadlightProtectionFilmPage from './pages/HeadlightProtectionFilmPage';
import InteriorProtectionFilmPage from './pages/InteriorProtectionFilmPage';
import CeramicCoatings from './pages/CeramicCoatingsPage';
import PaintCorrection from './pages/PaintCorrectionPage';
import WindowTintPage from './pages/WindowTintPage';
import VehicleWindowTintingPage from './pages/VehicleWindowTintingPage';
import ResidentialWindowTintPage from './pages/ResidentialTintingPage';
import CommercialWindowTintPage from './pages/CommercialTintingPage';
import LouisvilleKYPage from './pages/LouisvilleKYPage';
import CrestwoodKYPage from './pages/CrestwoodKYPage';
import MiddletownKYPage from './pages/MiddletownKYPage';
import JeffersontownKYPage from './pages/JeffersontownKYPage';
import StMatthewsKYPage from './pages/StMatthewsKYPage';
import Contact from './pages/ContactPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import BeforeAndAfterPage from './pages/BeforeAndAfterPage';
import FaqPage from './pages/FAQPage';
import {NextUIProvider} from "@nextui-org/react";
import NavBar from './components/NavigationBar';
import BlogPage from './pages/BlogPage';
import MobileDetailing from './pages/MobileDetailingPage';
import AboutPage from './pages/AboutPage';

function App() {

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
    <ParallaxProvider>
    <Router>
    <Helmet>
      <title>Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint</title>
      <meta name='title' content={`Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint`} />
      <meta name='description' content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Contact (502) 417-0690 for estimates. Cobb County, GA, Kennesaw, GA, Smyrna, GA, Atlanta, GA.' />
      <meta name='keywords' content='supreme detail studio, marietta car detail, mobile detailing, marietta ceramic coating, marietta mobile detail, ceramic coating, marietta paint correction, marietta paint protection, window tint in marietta' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

      <meta property="og:title" content={`Marietta GA's Top Paint Protection Film & Ceramic Coating Shop | Ceramic Coating Near Me, PPF Near Me, Window Tint`} />
      <meta property="og:description" content='Supreme Detail Studio in Marietta, GA | Paint Protection Film, Window Tinting, Detailing Packages, Ceramic Coatings. Contact (502) 417-0690 for estimates. Cobb County, GA, Kennesaw, GA, Smyrna, GA, Atlanta, GA.' />
      <meta property="og:image" content='%PUBLIC_URL%/preview.png' />

    </Helmet>
      <ScrollToTop>
      {/* <ScrollToTop> */}
        {/* <AlertMessage /> */}
        {/* <HeaderMenu /> */}
        <NavBar />
          <Routes>
            <Route path='/services/detailing' element={<Detailing />} />
            <Route path='/services/mobile-detailing' element={<MobileDetailing services/>} />
            <Route path='/services/exterior-detail' element={<ExteriorDetailing />} />
            <Route path='/services/interior-detail' element={<InteriorDetailing />} />
            <Route path='/services/full-detail' element={<FullDetailing />} />
            <Route path='/services/additional-services' element={<AddOnServicesPage />} />
            <Route path='/services/headlight-restoration' element={<HeadlightRestoration />} />
            <Route path='/services/paint-protection-film' element={<PPF />} />
            <Route path='/services/windshield-protection-film' element={<WindshieldProtectionFilmPage />} />
            <Route path='/services/light-protection-film' element={<HeadlightProtectionFilmPage />} />
            <Route path='/services/interior-protection-film' element={<InteriorProtectionFilmPage />} />
            <Route path='/services/ceramic-coatings' element={<CeramicCoatings />} />
            <Route path='/services/paint-correction' element={<PaintCorrection />} />
            <Route path='/services/window-tinting' element={<WindowTintPage />} />
            <Route path='/services/automotive-tinting' element={<VehicleWindowTintingPage />} />
            <Route path='/services/residential-tinting' element={<ResidentialWindowTintPage />} />
            <Route path='/services/commercial-tinting' element={<CommercialWindowTintPage />} />

            <Route path='/service-areas/marietta-ga' element={<LouisvilleKYPage />} />
            <Route path='/service-areas/atlanta-ga' element={<CrestwoodKYPage />} />
            <Route path='/service-areas/kennesaw-ga' element={<StMatthewsKYPage />} />
            <Route path='/service-areas/sandy-springs' element={<MiddletownKYPage />} />

            <Route path='/about' element={<AboutPage />} />
            <Route path='/gallery' element={<GalleryPage />} />
            <Route path='/reviews' element={<ReviewsPage />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/before-and-after' element={<BeforeAndAfterPage />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/' element={<Landing />} />
          </Routes>
        <Footer />
        </ScrollToTop>
    </Router>
    </ParallaxProvider>
    </main>
    </NextUIProvider>
  );
}

export default App;
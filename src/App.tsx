import { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Preloader onReady={() => setIsReady(true)} />
      <div
        className={`site-shell ${isReady ? 'site-shell-ready' : 'site-shell-hidden'}`}
        style={{ overflowX: 'visible' }}
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

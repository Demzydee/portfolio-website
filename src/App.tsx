import { useState, useCallback } from 'react';
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

  const handleReady = useCallback(() => setIsReady(true), []);

  return (
    <>
      <Preloader onReady={handleReady} />
      <div
        className={`site-shell ${isReady ? 'site-shell-ready' : 'site-shell-hidden'}`}
      >
        <main id="main-content">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PricingSection />
        <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import ModelViewer from './ModelViewer';
import DancingLetters from './ui/dancing-letters';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

export default function HeroSection() {
  return (
    <section id="top" className="hero-section">
      <FadeIn delay={0} y={-20} className="hero-nav-reveal">
      <nav className="hero-nav" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
        ))}
      </nav>
      </FadeIn>
      <FadeIn delay={0.15} y={40} className="hero-title">
        <h1 aria-label="Hi, I'm Vicki.">
          <span aria-hidden="true">
            <DancingLetters text="Hi, I'm Vicki." letterClassName="hero-letter normal-case" />
          </span>
        </h1>
      </FadeIn>
      <div className="hero-model"><ModelViewer /></div>
      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-description">a full-stack developer building fast, polished digital products</p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
      </div>
    </section>
  );
}

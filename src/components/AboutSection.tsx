import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const ABOUT_TEXT =
  "With over five years building for the web, I focus on product engineering, UX, and " +
  "high-performance interfaces. I partner with teams who want clean systems, thoughtful " +
  "execution, and experiences that feel as good as they look.";

const ABOUT_OBJECTS = [
  { name: 'moon', delay: 0.1 },
  { name: 'block', delay: 0.2 },
  { name: 'smile', delay: 0.25 },
  { name: 'cursor', delay: 0.3 },
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-spacing">
      <div className="about-art-layout">
        {ABOUT_OBJECTS.map((item) => (
          <FadeIn key={item.name} delay={item.delay} y={20} className={`about-art about-art-${item.name}`}>
            <img
              className="about-crystal"
              src={`/about/crystal-${item.name}.webp`}
              width={1254}
              height={1254}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </FadeIn>
        ))}
        <FadeIn delay={0} y={30} className="about-art-heading">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'var(--text-section)' }}>
            About me
          </h2>
        </FadeIn>
        <div className="about-details flex flex-col items-center">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[var(--color-text)] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'var(--text-body)' }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

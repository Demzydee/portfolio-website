import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const ABOUT_TEXT =
  "With over five years building for the web, I focus on product engineering, UX, and " +
  "high-performance interfaces. I partner with teams who want clean systems, thoughtful " +
  "execution, and experiences that feel as good as they look.";

const ABOUT_OBJECTS = [
  { type: 'moon', delay: 0.1, x: -80, y: 0, wrapClass: 'absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]' },
  { type: 'orb', delay: 0.25, x: -80, y: 0, wrapClass: 'absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]' },
  { type: 'cube', delay: 0.15, x: 80, y: 0, wrapClass: 'absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]' },
  { type: 'cluster', delay: 0.3, x: 80, y: 0, wrapClass: 'absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]' },
] as const;

function Floating3DObject({ type }: { type: (typeof ABOUT_OBJECTS)[number]['type'] }) {
  if (type === 'moon') {
    return (
      <div className="about-3d-object about-3d-moon" aria-hidden="true">
        <div className="about-3d-sphere" />
        <div className="about-3d-ring about-3d-ring-a" />
        <div className="about-3d-ring about-3d-ring-b" />
      </div>
    );
  }

  if (type === 'orb') {
    return (
      <div className="about-3d-object about-3d-orb" aria-hidden="true">
        <div className="about-3d-torus" />
        <div className="about-3d-core" />
      </div>
    );
  }

  if (type === 'cube') {
    return (
      <div className="about-3d-object about-3d-cube" aria-hidden="true">
        <div className="about-3d-cube-face face-front" />
        <div className="about-3d-cube-face face-back" />
        <div className="about-3d-cube-face face-left" />
        <div className="about-3d-cube-face face-right" />
        <div className="about-3d-cube-face face-top" />
        <div className="about-3d-cube-face face-bottom" />
      </div>
    );
  }

  return (
    <div className="about-3d-object about-3d-cluster" aria-hidden="true">
      <div className="about-3d-mini about-3d-mini-a" />
      <div className="about-3d-mini about-3d-mini-b" />
      <div className="about-3d-mini about-3d-mini-c" />
      <div className="about-3d-mini about-3d-mini-d" />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {ABOUT_OBJECTS.map((item) => (
        <FadeIn
          key={item.type}
          delay={item.delay}
          x={item.x}
          y={item.y}
          duration={0.9}
          className={item.wrapClass}
        >
          <Floating3DObject type={item.type} />
        </FadeIn>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

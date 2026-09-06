import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import ModelViewer from './ModelViewer';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn
        delay={0}
        y={-20}
        as="nav"
        className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="overflow-visible mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10">
        <div className="w-full max-w-6xl mx-auto relative z-20 text-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, I'm Vicki
          </h1>
        </div>
      </FadeIn>

      {/* Centered model in the middle of the hero */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-8 sm:translate-y-10 md:translate-y-12 pointer-events-none z-30">
        <div className="pointer-events-auto">
          <ModelViewer />
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a full-stack developer building fast, polished digital products
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

import FadeIn from './FadeIn';

interface Service {
  number: string;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    name: 'Frontend Engineering',
    description:
      'Responsive interfaces built with React, TypeScript, and modern UX patterns that feel fast, polished, and intuitive.',
  },
  {
    number: '02',
    name: 'Backend Systems',
    description:
      'Reliable APIs, auth flows, data modeling, and server-side logic that support real products at scale.',
  },
  {
    number: '03',
    name: 'Product Design',
    description:
      'Clear user experiences, conversion-focused flows, and product thinking that turns complexity into clarity.',
  },
  {
    number: '04',
    name: 'Performance Optimization',
    description:
      'Faster pages, leaner builds, and thoughtful architecture that improve experience and business outcomes.',
  },
  {
    number: '05',
    name: 'Full-stack Delivery',
    description:
      'End-to-end product work from idea to launch, spanning UI, logic, APIs, and deployment strategy.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2">
                <span
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.description}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

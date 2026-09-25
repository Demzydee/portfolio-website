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
    <section id="services" className="bg-white section-shell section-spacing">
      <h2
        className="font-black uppercase text-center section-heading"
        style={{ color: 'var(--color-bg)', fontSize: 'var(--text-section)' }}
      >
        Services
      </h2>

      <div className="content-container flex flex-col">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="service-row"
              style={{
                borderTop: i === 0 ? '1px solid var(--color-border-dark)' : undefined,
                borderBottom: '1px solid var(--color-border-dark)',
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ color: 'var(--color-bg)', fontSize: 'var(--text-number)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2">
                <span
                  className="font-medium uppercase"
                  style={{ color: 'var(--color-bg)', fontSize: 'var(--text-service)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: 'var(--color-bg)',
                    opacity: 0.6,
                    fontSize: 'var(--text-description)',
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

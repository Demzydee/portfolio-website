import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import { designSystem } from '../design-system';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$950',
    description: 'A focused sprint for a polished landing page or feature prototype.',
    features: ['Landing page build', 'UI implementation', '2 rounds of revisions'],
  },
  {
    name: 'Growth',
    price: '$2.4k',
    description: 'For products that need a stronger frontend, better UX, and launch-ready code.',
    features: ['Full product UI', 'API integration', 'Performance optimization'],
    featured: true,
  },
  {
    name: 'Signature',
    price: '$5k+',
    description: 'Custom engineering support for product strategy, systems, and full-stack delivery.',
    features: ['Product architecture', 'Full-stack build', 'Priority collaboration'],
  },
];

export default function PricingSection() {
  return (
    <section
      id="price"
      className={`bg-white ${designSystem.radii.lg} ${designSystem.radii.xl} px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32`}
      style={{ borderRadius: '40px 40px 0 0' }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.08} y={30}>
          <div className="mb-14 sm:mb-18 md:mb-20 text-center">
            <p
              className="uppercase tracking-[0.3em] font-medium mb-4"
              style={{ color: '#0C0C0C', opacity: 0.7, fontSize: '0.75rem' }}
            >
              Pricing
            </p>
            <h2
              className="font-black uppercase tracking-tight leading-none"
              style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Packages
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.12} y={30}>
              <article
                className="h-full flex flex-col p-6 sm:p-8 border"
                style={{
                  background: plan.featured ? '#0C0C0C' : '#F4F5F6',
                  borderColor: plan.featured ? 'rgba(255,255,255,0.09)' : 'rgba(12,12,12,0.08)',
                  borderRadius: '32px',
                  boxShadow: plan.featured ? '0 30px 80px rgba(14, 14, 18, 0.35)' : 'none',
                }}
              >
                <div className="mb-8">
                  <p
                    className="uppercase tracking-[0.2em] font-medium mb-4"
                    style={{
                      color: plan.featured ? '#D7E2EA' : '#0C0C0C',
                      opacity: plan.featured ? 0.7 : 0.7,
                      fontSize: '0.7rem',
                    }}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2 mb-4">
                    <span
                      className="font-black leading-none"
                      style={{
                        color: plan.featured ? '#F5F7FA' : '#0C0C0C',
                        fontSize: 'clamp(2.3rem, 6vw, 4.3rem)',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="uppercase tracking-wide"
                      style={{
                        color: plan.featured ? '#D7E2EA' : '#0C0C0C',
                        opacity: 0.7,
                        fontSize: '0.75rem',
                      }}
                    >
                      starting at
                    </span>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: plan.featured ? '#D7E2EA' : '#0C0C0C',
                      opacity: 0.72,
                      fontSize: '1rem',
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3"
                      style={{ color: plan.featured ? '#D7E2EA' : '#0C0C0C' }}
                    >
                      <span
                        className="inline-block rounded-full mt-1"
                        style={{
                          width: '8px',
                          height: '8px',
                          background: plan.featured
                            ? 'linear-gradient(123deg, #B600A8, #BE4C00)'
                            : '#0C0C0C',
                        }}
                      />
                      <span style={{ opacity: 0.82 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <ContactButton
                    className={plan.featured ? 'w-full justify-center' : 'w-full justify-center'}
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

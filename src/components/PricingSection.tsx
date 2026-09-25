import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$950',
    description: 'A focused sprint for a polished landing page or feature prototype.',
    features: ['Landing page build', 'UI implementation', '2 rounds of revisions'],
  },
  {
    name: 'Standard',
    price: '$2.4k',
    description: 'For products that need a stronger frontend, better UX, and launch-ready code.',
    features: ['Full product UI', 'API integration', 'Performance optimization'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$5k+',
    description: 'Custom engineering support for product strategy, systems, and full-stack delivery.',
    features: ['Product architecture', 'Full-stack build', 'Priority collaboration'],
  },
];

export default function PricingSection() {
  return (
    <section
      id="price"
      className="bg-white section-shell section-spacing"
    >
      <div className="content-container">
        <FadeIn delay={0.08} y={30}>
          <div className="section-heading text-center">
            <p
              className="uppercase tracking-[0.3em] font-medium mb-4"
              style={{ color: 'var(--color-bg)', opacity: 0.7, fontSize: 'var(--text-xs)' }}
            >
              Pricing
            </p>
            <h2
              className="font-black uppercase tracking-tight leading-none"
              style={{ color: 'var(--color-bg)', fontSize: 'var(--text-section)' }}
            >
              Packages
            </h2>
          </div>
        </FadeIn>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.12} y={30}>
              <article
                className="h-full flex flex-col p-6 sm:p-8 border"
                style={{
                  background: plan.featured ? 'var(--color-bg)' : 'var(--color-surface-subtle)',
                  borderColor: plan.featured ? 'var(--color-border-subtle)' : 'var(--color-border-subtle-dark)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: plan.featured ? 'var(--shadow-featured)' : 'none',
                }}
              >
                <div className="mb-8">
                  <p
                    className="uppercase tracking-[0.2em] font-medium mb-4"
                    style={{
                      color: plan.featured ? 'var(--color-text)' : 'var(--color-bg)',
                      opacity: plan.featured ? 0.7 : 0.7,
                      fontSize: 'var(--text-caption)',
                    }}
                  >
                    {plan.name}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2 mb-4">
                    <span
                      className="font-black leading-none"
                      style={{
                        color: plan.featured ? 'var(--color-text-strong)' : 'var(--color-bg)',
                        fontSize: 'var(--text-price)',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="uppercase tracking-wide"
                      style={{
                        color: plan.featured ? 'var(--color-text)' : 'var(--color-bg)',
                        opacity: 0.7,
                        fontSize: 'var(--text-xs)',
                      }}
                    >
                      starting at
                    </span>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: plan.featured ? 'var(--color-text)' : 'var(--color-bg)',
                      opacity: 0.72,
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="bullet-list mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="bullet-list-item"
                      style={{ color: plan.featured ? 'var(--color-text)' : 'var(--color-bg)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="bullet-list-marker"
                        style={{
                          background: plan.featured
                            ? 'var(--gradient-feature)'
                            : 'var(--color-bg)',
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

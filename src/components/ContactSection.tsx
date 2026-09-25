import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import { designSystem } from '../design-system';

const contactDetails = [
  { label: 'Email', value: 'hello@vicki.studio', href: 'mailto:hello@vicki.studio' },
  { label: 'Instagram', value: '@vicki.studio', href: 'https://instagram.com' },
  { label: 'Location', value: 'Remote worldwide', href: '#' },
];

export default function ContactSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.4, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[var(--color-bg)] section-spacing"
    >
      <div className="content-container grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <FadeIn delay={0.08} y={30}>
          <motion.div style={{ y: reducedMotion ? 0 : textY }}>
            <p
              className="uppercase tracking-[0.3em] font-medium mb-6"
              style={{ color: 'var(--color-text)', opacity: 0.75, fontSize: 'var(--text-xs)' }}
            >
              Let&apos;s build something real
            </p>
            <h2
              className="hero-heading font-black uppercase leading-[0.9] tracking-tight mb-6 max-w-[700px]"
              style={{ fontSize: 'var(--text-contact)' }}
            >
              Build the boldest version of your product.
            </h2>
            <p
              className="max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text)', opacity: 0.72, fontSize: 'var(--text-body)' }}
            >
              I design and build digital products that are fast, intuitive, and production-ready,
              covering everything from the interface to the infrastructure.
            </p>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.18} y={30}>
          <motion.div
            style={{
              y: reducedMotion ? 0 : cardY,
              opacity: reducedMotion ? 1 : cardOpacity,
              background: designSystem.gradients.panel,
              border: `1px solid ${designSystem.colors.border}`,
              borderRadius: 'var(--radius-lg)',
              boxShadow: designSystem.shadows.card,
            }}
            className="relative p-6 sm:p-8"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              {contactDetails.map((item) => {
                const isExternalLink = item.href.startsWith('http');
                return (
                  <div key={item.label} className="contact-detail">
                    <span
                      className="uppercase tracking-[0.2em]"
                      style={{ color: 'var(--color-text)', opacity: 0.7, fontSize: 'var(--text-caption)' }}
                    >
                      {item.label}
                    </span>
                    {item.href === '#' ? (
                      <span style={{ color: 'var(--color-text-strong)', fontSize: 'var(--text-base)' }}>{item.value}</span>
                    ) : (
                      <a
                        href={item.href}
                        {...(isExternalLink ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                        style={{ color: 'var(--color-text-strong)', fontSize: 'var(--text-base)' }}
                      >
                        {item.value}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <ContactButton className="w-full justify-center" />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

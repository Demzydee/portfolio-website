import { designSystem } from '../design-system';

const footerLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Email', href: 'mailto:hello@vicki.studio' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{
        background: designSystem.colors.background,
        borderColor: designSystem.colors.border,
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 md:px-10 py-10 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="uppercase tracking-[0.28em]"
              style={{
                color: designSystem.colors.muted,
                fontSize: '0.7rem',
              }}
            >
              Vicki Studio
            </p>
            <p
              className="mt-4 max-w-md leading-relaxed"
              style={{
                color: designSystem.colors.text,
                opacity: 0.75,
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              }}
            >
              Building elegant digital products with clear strategy, thoughtful UX, and reliable
              engineering from concept to launch.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-5 sm:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-opacity hover:opacity-100"
                style={{
                  color: designSystem.colors.textStrong,
                  opacity: 0.8,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: designSystem.colors.border }}
        >
          <p style={{ color: designSystem.colors.muted, fontSize: '0.8rem' }}>
            © 2026 Vicki Studio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: designSystem.colors.text,
                  opacity: 0.8,
                  fontSize: '0.8rem',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

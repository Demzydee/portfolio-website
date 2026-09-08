interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ContactButton({ onClick, className = '' }: ContactButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 bg-[#0d1117] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#D7E2EA] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D7E2EA]/70 hover:bg-[#111a22] active:translate-y-0',
        className,
      ].join(' ')}
    >
      Contact Me
    </button>
  );
}

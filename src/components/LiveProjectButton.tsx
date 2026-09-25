interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function LiveProjectButton({ onClick, className = '' }: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center rounded-full border border-[var(--color-text)]/30 bg-transparent px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-text)]/70 hover:bg-[var(--color-text)]/5 active:translate-y-0',
        className,
      ].join(' ')}
    >
      Live Project
    </button>
  );
}

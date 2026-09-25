interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ContactButton({ onClick, className = '' }: ContactButtonProps) {
  const classes = `button ${className}`;
  return onClick ? (
    <button type="button" onClick={onClick} className={classes}>Contact Me</button>
  ) : (
    <a href="mailto:hello@vicki.studio" className={classes}>Contact Me</a>
  );
}
